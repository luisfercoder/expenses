# Decisiones de Arquitectura (Fase 1 — Frontend)

> Registro de decisiones de arquitectura tomadas en modo mentor. Complementa a `README.md` (discovery original) y `DOMAIN.md` (entidades del dominio). Se actualiza a medida que se cierran temas.

---

## Convención de nombres: idioma y casing

**Idioma:** la documentación de dominio (`DOMAIN.md`, `README.md`) se queda en español. El código (carpetas de feature, tipos, variables, funciones) se escribe en **inglés**, por profesionalismo/convención de la industria. Esto es una decisión consciente, no una mezcla accidental — aplica de forma consistente a toda entidad nueva que se traduzca a código.

**Glosario Dominio (ES) → Código (EN):**

| DOMAIN.md (español) | Código (inglés) |
|---|---|
| Usuario | User |
| Movimiento | Movement |
| Tarjeta | Card |
| Categoría | Category |
| Presupuesto | Budget |
| CompraDiferida | DeferredPurchase |

**Casing:**
- Carpetas de **feature** (paquete con `domain/`, `services/`, `hooks/`, `components/` adentro): minúsculas — `features/movement/`, `features/card/`, `features/dashboard/`. Señal visual de "esto es un módulo de feature", distinto a un componente.
- Carpetas y archivos de **componente** (un solo componente de React): PascalCase — `components/StatisticCard/`. Obligatorio, no solo estilo: React exige que un componente empiece con mayúscula para que JSX lo distinga de una etiqueta HTML nativa.
- Sufijo `Id` en campos de referencia (foreign keys): `Id` (minúscula la "d"), no `ID` — ej. `userId`, `categoryId`, `cardId`, `deferredPurchaseId`. Consistente con camelCase estándar de JS/TS.

---

## Organización por Features

Se confirma la intención ya declarada en el discovery ("la arquitectura evolucionará hacia una organización basada en Features"): cada entidad del dominio (`DOMAIN.md`) es una feature con su propia carpeta.

```
features/
  tarjeta/
    domain/          ← lógica pura de negocio, sin JSX ni React (ej. calcularSaldoUtilizado.ts)
    components/      ← UI específica de la feature (JSX + Tailwind)
    hooks/           ← opcional — conecta domain con estado/React (ej. useTarjetas.ts)
    types.ts
  movimiento/
  compraDiferida/
  categoria/
  presupuesto/
  usuario/
```

**Decisión clave — separar `domain/` de `components/` dentro de cada feature:** la lógica de negocio (los cálculos definidos en `DOMAIN.md`: `saldoUtilizado`, `saldoPendiente`, `gastado`, etc.) debe poder existir sin depender de React ni de JSX. Motivo: la Fase 5 del roadmap (Mobile) tiene como objetivo explícito "reutilización de lógica" — si el cálculo está mezclado con componentes web (Tailwind, JSX específico de web), no se puede reutilizar tal cual en React Native.

**Convención de nombres:**
- `domain/`, no "logic" — ambiguo (hasta un `onClick` es "lógica"). `domain` ata el código directamente al vocabulario ya usado en `DOMAIN.md`: la carpeta `features/tarjeta/domain/` contiene exactamente lo que describe la sección "Tarjeta" de ese archivo.
- `components/`, no "pages" — "pages" ya tiene un significado específico (pantallas ligadas a una ruta, cubierto por la carpeta `app/` del árbol original). Usar el mismo término para dos cosas distintas genera confusión.

También se descartó agrupar la lógica de negocio junto con utilidades genéricas en una carpeta `helpers/` o `utils/`: formatear una fecha y calcular el saldo de una tarjeta no tienen la misma responsabilidad — lo primero es una utilidad genérica sin relación con ninguna entidad, lo segundo es una regla de negocio que depende de las decisiones tomadas en `DOMAIN.md`. `utils/` (a la altura de `src/`, ya en el árbol original) se reserva para lo genérico; cada `domain/` de feature es dueño de sus propias reglas.

---

## Estado global

**Librería:** Zustand (decisión de aprendizaje — el proyecto no requería una librería en particular, se eligió Zustand por ser ligera, con poco boilerplate, y portable a React Native para la Fase 5).

**Decisión clave — separación de responsabilidades entre `hooks/` y `domain/`:**

```
features/tarjeta/
  domain/
    calcularSaldoUtilizado.ts   ← puro: recibe datos, regresa un resultado. No sabe que existe Zustand.
  hooks/
    useTarjetas.ts              ← atado a React: llama a services/, guarda en el store (Zustand), llama a domain/
  components/
    TarjetaCard.tsx             ← usa el hook, no calcula nada él mismo
```

El store (Zustand) y las funciones de `domain/` nunca se tocan directamente entre sí — el hook es el único punto de conexión. Esto es lo que permite que, en Fase 5, la app móvil reutilice exactamente las mismas funciones de `domain/` aunque el manejo de estado ahí sea distinto (o el mismo, pero con su propio hook adaptado a React Native).

En Fase 1, los datos vienen de mocks a través de la capa `services/` (ver sección "Datos simulados"); en Fase 2, solo `services/` cambia — `hooks/`, `domain/` y `components/` no se enteran del cambio.

---

## Estilos

**Elección (revisada):** Material UI (MUI) como librería de componentes atómicos y como motor de estilos — se descartó tanto Tailwind como Sass. Un solo sistema de estilos en todo el proyecto, para no tener dos fuentes de los mismos tokens de diseño.

**Decisión clave — MUI es la única fuente de verdad de los tokens:**

```
src/
  theme.ts          ← ThemeProvider de MUI: colores, tipografía, espaciados. Única fuente de verdad.
```

Cualquier estilo, ya sea de un átomo de MUI o de un componente propio, se resuelve con las herramientas nativas de MUI (`sx`, `styled()`) — no con archivos `.scss` ni Tailwind. `styled()` usa el mismo motor (Emotion) que ya trae MUI por debajo, así que no se agrega un segundo sistema en paralelo.

**Motivo del cambio:** se había decidido Sass Modules antes de considerar traer MUI. Al incorporar MUI para los componentes atómicos (ver sección Design System), mantener Sass en paralelo hubiera significado dos fuentes de los mismos valores de diseño (colores, espaciados) — justo el riesgo de inconsistencia que se quería evitar desde el principio.

---

## Design System

**Ubicación:** `components/` a nivel raíz de `src/` (no dentro de ninguna feature) — sigue siendo el lugar de la UI genérica y reutilizable, sin conocimiento del dominio financiero.

**Decisión clave (revisada) — átomos vs. compuestos:**
- **Átomos** (`Button`, `Input`, `Select`, `Divider`, `Spinner`, etc.): se usan directo de MUI (`@mui/material`), sin reconstruirlos desde cero. No viven como archivos propios en `components/`.
- **Compuestos** (`StatisticCard`, `Badge` con reglas propias, y cualquier combinación específica de este proyecto): sí se construyen a mano en `components/`, por dentro usando átomos de MUI (`Card`, `Typography`, etc.) combinados a la medida.
- Si en el futuro se necesita reemplazar algún átomo de MUI por uno propio (Design System 100% custom), el usuario lo señala explícitamente — no es el plan por ahora.

**Decisión clave — componentes "tontos" (se mantiene):** ni los átomos de MUI ni los compuestos propios reciben tipos del dominio (`Movimiento`, `Tarjeta`, etc.) ni calculan nada de negocio. Solo reciben props genéricas (`titulo`, `valor`, `icono`, `variant`, `children`...). Motivo: mantenerlos reutilizables fuera del contexto financiero y evitar que un cambio de regla de negocio obligue a tocar UI compartida por toda la app.

**Composición con features:** el cálculo y la lógica de negocio que alimentan a un componente del Design System viven en la feature correspondiente, no en el Design System mismo.

---

## Dashboard

`dashboard` no es una entidad del dominio — es una **feature de composición**: agrega y presenta datos que ya calculan otras features. Sigue el mismo patrón `domain/` + `hooks/` + `components/`, pero su propio `domain/` solo debería contener lógica que sea exclusiva de esa vista (si la hubiera); todo lo que sea intrínseco de una entidad se reutiliza desde la feature dueña.

**Regla de dependencia (clave para toda la arquitectura, no solo Dashboard):** las features de entidad (`movimiento`, `tarjeta`, `compraDiferida`, `categoria`, `presupuesto`) nunca deben depender de `dashboard` ni de ninguna otra feature de composición — deben poder usarse, entenderse y probarse solas. `dashboard` sí puede depender de ellas, porque su trabajo es justamente componerlas. Si algún día una entidad "necesitara" algo de `dashboard`, es señal de que ese cálculo está mal ubicado.

**Mapeo de las secciones del Dashboard (discovery → dueño del cálculo):**

| Sección del Dashboard | Vive en |
|---|---|
| Balance del mes, Ingresos, Gastos, Ahorro (Ingresos − Gastos) | `features/movimiento/domain/` |
| Gastos por categoría | `features/movimiento/domain/` (agrupa su propia colección por `categoriaId`; reutilizable después desde una pantalla de detalle de categoría) |
| Próximos pagos, Pagos diferidos | `features/compraDiferida/domain/` (proyección calculada, ver `DOMAIN.md`) |
| Tarjetas (saldo utilizado, etc.) | `features/tarjeta/domain/` |

Ejemplo de composición final en `dashboard/components/`:

```
components/                          ← Design System (tonto, reutilizable, sin dominio)
  StatisticCard.tsx

features/movimiento/
  domain/
    calcularBalanceDelMes.ts         ← puro, recibe Movimiento[], regresa un número

features/dashboard/
  hooks/
    useBalanceDelMes.ts              ← lee Movimientos del store, llama a movimiento/domain/
  components/
    BalanceCard.tsx                  ← usa el hook, renderiza <StatisticCard valor={...} titulo="Balance del mes" />
```

**Ahorro — nota:** por ahora se calcula como `Ingresos − Gastos` del mes, sin entidad propia. El MVP menciona "Objetivos de ahorro" como algo más completo (con seguimiento en el tiempo) — queda como mejora futura, no cubierta por las 6 entidades de `DOMAIN.md`.

---

## Datos simulados (mock)

**Ubicación:** carpeta `mocks/` a nivel raíz de `src/`, un archivo por entidad (`tarjetas.mock.ts`, `movimientos.mock.ts`, `compraDiferida.mock.ts`, `categorias.mock.ts`, `presupuestos.mock.ts`, `usuarios.mock.ts`). Centralizado para dejar claro que es información temporal que se reemplaza por completo en Fase 2, pero separado por archivo para que sea fácil de encontrar. Los datos respetan las relaciones definidas en `DOMAIN.md` (ej. `Movimiento.categoriaId` mock debe apuntar a un id que exista en `categorias.mock.ts`).

**Decisión clave — capa `services/` por feature:** cada feature agrega una carpeta más, junto a `domain/`, `hooks/` y `components/`:

```
features/tarjeta/
  services/
    obtenerTarjetas.ts     ← async — hoy regresa el mock, en Fase 2 será un fetch real a la API, misma firma
  domain/
    calcularSaldoUtilizado.ts
  hooks/
    useTarjetas.ts          ← llama a services/, guarda en el store, llama a domain/
  components/
    TarjetaCard.tsx
```

`services/` es distinto de `hooks/`: `services/` solo obtiene datos (sin saber de React ni del store), `hooks/` conecta esos datos con React y con Zustand. Se define como función `async` desde Fase 1 — aunque hoy solo resuelve un array en memoria — para que Fase 2 sea literalmente cambiar la implementación interna de esa función (mock → llamada HTTP real) sin tocar `hooks/`, `domain/` ni `components/`.

`services/` no es solo para leer: la misma idea aplica al guardar. `guardarMovimiento()` en `features/movimiento/services/` es async desde Fase 1 (hoy agrega al store/mock, en Fase 2 será un `POST` real) por la misma razón — consistencia con el patrón de lectura, y un cambio mínimo cuando llegue el backend.

---

## Formularios progresivos

Ejemplo del discovery: "¿Compra diferida? → Sí → ¿Cuántos meses? → ¿Qué tarjeta? → Fecha de compra → Confirmación" — un formulario de `Movimiento` (con React Hook Form + Zod) que ramifica hacia campos de `CompraDiferida` según la respuesta.

**Decisión clave — esquemas de Zod viven en `domain/`, no en el componente:** las reglas que valida el formulario (monto siempre positivo, tipo uno de dos valores) son las mismas reglas ya definidas en `DOMAIN.md` — no reglas nuevas. Van en `features/movimiento/domain/`, junto a las funciones de cálculo, para no duplicar lo que ya existe. El componente del formulario solo importa y usa el esquema, no lo redefine.

**Decisión clave — estado del wizard es local, no global:** en qué paso va el formulario y las respuestas parciales mientras está abierto NO viven en el store de Zustand — es estado efímero que solo le importa a este formulario mientras existe (estado local de React / de React Hook Form). Solo cuando el usuario confirma, el `Movimiento` ya completo pasa a `services/` → store global, igual que cualquier otro dato de la app. Meter el estado del wizard al store global hubiera sido complejidad sin beneficio: nadie más en la app necesita saber "en qué paso va este formulario".

```
features/movimiento/
  domain/
    movimientoSchema.ts        ← esquema de Zod, reglas de DOMAIN.md
    calcularBalanceDelMes.ts
  services/
    guardarMovimiento.ts       ← async — hoy escribe al store/mock, en Fase 2 será un POST real
  components/
    MovimientoForm.tsx         ← usa movimientoSchema para validar, estado del wizard local, llama a services/ al confirmar
```

---

# Fase 1 (Arquitectura) cerrada

Los seis puntos del roadmap de Fase 1 — dominio, arquitectura, Design System, Dashboard, formularios, datos simulados — están definidos y documentados en `DOMAIN.md` y este archivo. Patrón consistente en todas las features: `services/` (obtiene/guarda datos, async desde el día uno) → `hooks/` (conecta con React/Zustand) → `domain/` (reglas puras, cálculos y validación) → `components/` (UI, usa todo lo anterior sin saber cómo funciona por dentro). El Design System (`components/` raíz) permanece agnóstico del dominio en todo momento.
