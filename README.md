# 💰 Finance Tracker

> Aplicación de gestión financiera personal desarrollada como proyecto de aprendizaje Full Stack.

---

# 📖 Descripción

Finance Tracker es una aplicación cuyo objetivo es ayudar al usuario a administrar sus finanzas personales mediante el registro de ingresos, gastos, tarjetas de crédito, compras diferidas y presupuestos.

Este proyecto tiene un doble propósito:

- Construir una aplicación real que pueda utilizarse en el día a día.
- Servir como proyecto de aprendizaje para profundizar en Frontend, Backend, Arquitectura de Software y Desarrollo Mobile.

---

# 🎯 Objetivos del Proyecto

## Objetivo Principal

Construir una aplicación Full Stack que permita administrar las finanzas personales desde una interfaz web y posteriormente desde una aplicación móvil.

---

## Objetivos de Aprendizaje

Durante el desarrollo del proyecto se busca aprender y reforzar conocimientos sobre:

- Arquitectura Frontend
- Arquitectura Backend
- React
- TypeScript
- C#
- .NET
- Bases de Datos Relacionales
- Diseño de APIs REST
- React Native
- Clean Code
- SOLID
- Diseño de Software
- Buenas prácticas de desarrollo

---

# 🗺️ Roadmap

## Fase 1

Frontend Web

- Diseño del dominio
- Arquitectura
- Design System
- Dashboard
- Formularios
- Estado global
- Datos simulados

---

## Fase 2

Backend

- API REST
- C#
- .NET
- Persistencia
- Autenticación
- Validaciones

---

## Fase 3

Base de Datos

- Diseño
- Relaciones
- Migraciones
- Consultas

---

## Fase 4

Integración

- Consumo de APIs
- Manejo de errores
- Caché
- Seguridad

---

## Fase 5

Aplicación Mobile

- React Native
- Reutilización de lógica
- Consumo de APIs
- Publicación

---

# 📌 MVP

La primera versión incluirá:

- Registro de usuarios
- Inicio de sesión
- Dashboard
- Registro de ingresos
- Registro de gastos
- Categorías
- Tarjetas de crédito
- Compras diferidas
- Gastos fijos
- Objetivos de ahorro
- Próximos pagos
- Resumen mensual

---

# 👤 Flujo Principal del Usuario

```text
Crear cuenta
        │
        ▼
Iniciar sesión
        │
        ▼
Configuración inicial
        │
        ▼
Dashboard
        │
 ┌──────┼─────────┐
 │      │         │
 ▼      ▼         ▼
Ingresos Gastos Tarjetas
        │
        ▼
Resumen mensual
```

---

# 🏗️ Entidades del Dominio

## Usuario

### Responsabilidad

Representar al propietario de la información.

---

## Movimiento

### Responsabilidad

Representar una operación financiera.

Puede ser:

- Ingreso
- Gasto
- (Futuro) Transferencia

---

## Tarjeta

### Responsabilidad

Representar un medio de crédito.

Debe conocer:

- Fecha de corte
- Fecha de pago
- Límite de crédito

---

## Categoría

### Responsabilidad

Clasificar los movimientos financieros.

---

## Presupuesto

### Responsabilidad

Definir objetivos financieros y límites de gasto.

---

# 📐 Reglas de Negocio

## Compras diferidas

Una compra diferida debe mostrar:

- Pago mensual.
- Mes actual.
- Total de mensualidades.
- Saldo pendiente.

Ejemplo:

```
MacBook

$24,000

12 meses

Mes 3 / 12

Pago mensual

$2,000

Saldo pendiente

$18,000
```

---

## Dashboard

Debe mostrar:

- Balance del mes.
- Ingresos.
- Gastos.
- Ahorro.
- Próximos pagos.
- Gastos por categoría.
- Pagos diferidos.
- Tarjetas.

---

## Formularios

Los formularios serán progresivos.

Ejemplo:

```
¿Compra diferida?

↓

Sí

↓

¿Cuántos meses?

↓

¿Qué tarjeta?

↓

Fecha de compra

↓

Confirmación
```

---

# 🧠 Principios de Diseño

## Fuente Única de Verdad

No almacenar información que pueda calcularse.

Ejemplo:

❌ Guardar saldo restante.

✅ Calcular saldo restante.

---

## Responsabilidad Única

Cada entidad debe tener una única responsabilidad.

---

## Pensar primero en el dominio

Las pantallas representan entidades.

Las entidades NO representan pantallas.

---

## Escalabilidad

Diseñar pensando en futuras funcionalidades como:

- Inversiones
- Cuentas bancarias
- Ahorros
- Seguros
- Criptomonedas

---

# 📁 Arquitectura

```
src/
│
├── app/
├── assets/
├── components/
├── config/
├── features/
├── hooks/
├── stores/
├── styles/
├── test/
├── types/
└── utils/
```

La arquitectura evolucionará hacia una organización basada en Features.

---

# 🎨 Design System

Se desarrollará un Design System propio.

Componentes iniciales:

- Button
- Input
- Select
- Card
- Modal
- Badge
- Table
- Dialog
- Spinner
- StatisticCard

---

# 🛠️ Stack Tecnológico

## Frontend

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- Zustand
- Sass (CSS Modules)

---

## Backend

- C#
- ASP.NET Core
- Entity Framework

---

## Base de Datos

- PostgreSQL

---

## Mobile

- React Native

---

# 📚 Convenciones del Proyecto

Durante el desarrollo del proyecto se seguirá la siguiente filosofía.

## No copiar soluciones

Antes de implementar cualquier funcionalidad se deberá comprender completamente el problema.

---

## Aprender antes de programar

Cada decisión técnica debe responder a un problema real.

---

## Pensar como arquitecto

Antes de escribir código responder:

- ¿Qué problema resuelve?
- ¿Puede escalar?
- ¿Existe una mejor abstracción?
- ¿La responsabilidad está bien ubicada?

---

## Código limpio

Priorizar:

- Legibilidad.
- Simplicidad.
- Reutilización.
- Mantenibilidad.

---

# 🎯 Objetivo Personal

Este proyecto tiene como finalidad desarrollar las habilidades necesarias para desempeñarse como desarrollador Full Stack, comprendiendo todas las capas de una aplicación moderna, desde el diseño del dominio hasta el despliegue y el consumo desde aplicaciones móviles.

Más importante que terminar la aplicación será comprender el porqué detrás de cada decisión técnica tomada durante el desarrollo.
