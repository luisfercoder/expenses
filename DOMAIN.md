# Decisiones de Diseño del Dominio

> Registro de decisiones tomadas en modo mentor, entidad por entidad. Complementa a `README.md` (que es el discovery original). Este archivo se actualiza a medida que se cierran entidades.

Regla general adoptada para todas las relaciones: **en una relación uno-a-muchos, el foreign key vive del lado de "muchos"**. Se usó para decidir Categoría↔Movimiento, CompraDiferida↔Movimiento y Tarjeta↔CompraDiferida.

---

## Movimiento

**Responsabilidad:** representar UNA operación financiera (ingreso o gasto) que ya ocurrió. No clasifica (eso es trabajo de Categoría) ni define objetivos/límites (eso es Presupuesto).

```
Movimiento
- usuarioId → Usuario
- tipo: Ingreso | Gasto
- monto: positivo (nunca negativo — evita contradicción con `tipo`)
- fecha
- descripcion (opcional)
- categoriaId → Categoría
- compraDiferidaId → CompraDiferida (opcional, solo si nació de una compra diferida)
- medioDePago: Efectivo | Tarjeta | Transferencia
- tarjetaId → Tarjeta (opcional; ver regla de no-duplicación abajo)
```

**Regla de no-duplicación con Tarjeta:** si `compraDiferidaId` tiene valor, `tarjetaId` se deja vacío — la tarjeta se obtiene recorriendo `compraDiferida.tarjetaId`. `tarjetaId` directo solo se llena cuando el movimiento es un gasto con tarjeta que NO viene de una compra diferida (una compra normal, pagada de una sola vez).

Pendiente para Fase 2 (Backend): las reglas "monto siempre positivo" y "tipo es uno u otro" deben vivir como fuente de verdad en el backend (no solo en el formulario web), porque en Fase 5 la app móvil consumirá la misma API y podría enviar datos inválidos si la única validación está en el frontend. El frontend puede repetir la validación como capa extra de UX, pero no como única garantía.

---

## CompraDiferida

**Responsabilidad:** representar el "trato completo" de una compra a meses (ej. MacBook, $24,000, 12 meses) — la información que no le corresponde a una mensualidad individual.

```
CompraDiferida
- usuarioId → Usuario
- descripcion            (ej. "MacBook")
- montoTotal
- numeroDeMeses
- fechaCompra
- tarjetaId → Tarjeta

Calculado, NO almacenado:
- mesActual        (a partir de fechaCompra vs. hoy, y fecha de corte de la tarjeta)
- pagoMensual      (montoTotal / numeroDeMeses)
- saldoPendiente   (montoTotal - lo ya pagado)
```

**Decisión clave:** las mensualidades futuras NO se crean como registros `Movimiento` reales por adelantado. Solo existe un `Movimiento` real para los meses que ya ocurrieron; los meses futuros ("Próximos pagos" en el dashboard) son una **proyección calculada** a partir de `CompraDiferida`, no un registro guardado.

Razonamiento: se consideró la alternativa de crear los 12 `Movimiento` de una vez (incluyendo meses futuros), pero eso hubiera requerido agregar un campo `estado: Pendiente | Realizado` a `Movimiento` para no contar en el balance mensual gastos que aún no ocurren — mezclando dos conceptos distintos (una operación que ya pasó vs. una proyección) dentro de la misma entidad. Se descartó por romper la definición de `Movimiento` ("una operación financiera" a secas) y por duplicar información que puede derivarse de `CompraDiferida`.

No se agregó un `Movimiento.tarjetaId` directo con propósito general — solo aplica para el caso de gasto directo con tarjeta (ver sección Tarjeta). Para movimientos nacidos de una compra diferida, la tarjeta se obtiene recorriendo `movimiento.compraDiferida.tarjeta`, evitando un segundo camino duplicado hacia el mismo dato.

---

## Tarjeta

**Responsabilidad:** representar un medio de crédito.

```
Tarjeta
- usuarioId → Usuario
- nombre            (ej. "BBVA Oro" — alias original, lo define el usuario; no calculable)
- fechaCorte
- fechaPago
- limiteCredito

Calculado, NO almacenado:
- saldoUtilizado    (suma de CompraDiferida.saldoPendiente ligadas a esta tarjeta
                      + Movimiento con tarjetaId directo y medioDePago = Tarjeta)
```

**Decisión clave:** `fechaCorte` y `fechaPago` se capturan como datos independientes, NO se deriva una de la otra — varían por banco sin una regla fija. Esto reveló un hueco: `CompraDiferida` cubre las compras a meses, pero la mayoría de los gastos con tarjeta son compras normales (una sola exhibición). Se cerró ese hueco agregando `medioDePago` y `tarjetaId` (opcional) a `Movimiento`, evitando duplicar el camino hacia `Tarjeta` para los movimientos que sí vienen de una compra diferida.

---

## Categoría

**Responsabilidad:** clasificar los movimientos financieros.

```
Categoría
- usuarioId → Usuario
- nombre
- categoriaPadreId → Categoría (self-reference / relación reflexiva, opcional — null en categorías de nivel superior)
```

**Decisión clave:** `Categoría` NO tiene campo `tipo` (Ingreso/Gasto). Se descartó porque hubiera duplicado el `tipo` que ya vive en `Movimiento`, con riesgo de contradicción (ej. Movimiento tipo=Gasto apuntando a una categoría tipo=Ingreso). En vez de sincronizar dos fuentes, se eliminó la redundante — mismo criterio que "monto siempre positivo" en Movimiento. Para "gastos por categoría" en el dashboard, se filtra primero por `Movimiento.tipo` y luego se agrupa por `categoriaId`.

Subcategorías (ej. "Restaurantes" dentro de "Comida") se modelan como relación reflexiva dentro de la misma entidad, no como una entidad aparte — mismo patrón uno-a-muchos de siempre, aplicado a la propia tabla.

Quedó fuera del dominio, por ser presentación y no clasificación: ícono/color para el `Badge` del Design System.

---

## Presupuesto

**Responsabilidad:** definir objetivos financieros y límites de gasto.

```
Presupuesto
- usuarioId → Usuario
- nombre               (ej. "Gastos hormiga")
- limite

Calculado, NO almacenado:
- gastado              (suma de Movimiento tipo=Gasto, del mes en curso,
                         en las categorías ligadas a este presupuesto)
- disponible           (limite - gastado)
```

Relación con Categoría: `Categoria.presupuestoId → Presupuesto` (opcional) — uno-a-muchos normal, mismo patrón de siempre. Se descartó muchos-a-muchos porque se decidió que cada categoría pertenece a un solo presupuesto a la vez (más control).

**Decisión clave:** el límite es recurrente y sin fecha — igual que el día de corte de `Tarjeta`, no se guarda una instancia por mes. "Gastado" siempre se calcula contra el mes en curso. Si alguien edita `limite` a mitad de mes, no queda historial del valor anterior.

**Mejora futura (fuera de alcance por ahora):** historial de cambios de `limite` a lo largo del tiempo.

---

## Usuario

**Responsabilidad:** representar al propietario de la información — cada cuenta es privada, nada se comparte entre usuarios.

```
Usuario
- nombre
- email               (identificador único de login)
- passwordHash        (nunca se guarda en texto plano)
```

Relación con el resto del dominio: `Movimiento`, `CompraDiferida`, `Tarjeta`, `Categoría` y `Presupuesto` cargan cada una su propio `usuarioId → Usuario` — mismo patrón uno-a-muchos, repetido cinco veces.

**Nota:** esto no contradice la regla de "no duplicar caminos hacia el mismo dato" usada en Movimiento/Tarjeta. Ahí se evitaba tener dos referencias al *mismo* dato en la *misma* fila. Aquí cada entidad necesita declarar su propio dueño directamente (no depender de una cadena de relaciones) para poder aislar los datos de cada usuario de forma simple y confiable en cualquier consulta.

---

# Dominio cerrado

Las 6 entidades del discovery (Usuario, Movimiento, Tarjeta, Categoría, Presupuesto, CompraDiferida) están definidas: responsabilidad, campos originales vs. calculados, y relaciones con su cardinalidad. Esto es lo que debería guiar el diseño del Design System (Fase 1) y, más adelante, las tablas y migraciones de Fase 3.
