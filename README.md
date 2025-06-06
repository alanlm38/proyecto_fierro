## Proyecto: Administrador de Productos (Fullstack - PERN)

Sistema de gestión de productos desarrollado como proyecto final para la materia *Ingeniería de Software* de la carrera Ingeniería en Sistemas computacionales en el Instituto Tecnológico de Celaya.

Tecnologías utilizadas:

* **Backend**: Node.js, Express, PostgreSQL, TypeScript, Jest
* **Frontend**: React, TailwindCSS, React Router, Zod, Vite
* **Testing**: Jest, Supertest
* **Deployment**: Render (backend), Vercel (frontend)

## Historial de versiones 
 
### [v1.0.0] - Inicio 
- Configuración de React con Vite + TS 
- Configuración de Express y PostgreSQL 
- Endpoint base para productos 
 
### [v1.1.0] - CRUD completo 
- Formulario para crear productos 
- Listado general 
- Edición y eliminación funcional
 
### [v1.2.0] - Deploy 
- Backend desplegado en Render 
- Frontend en Vercel 
- Conexión segura entre frontend y backend 
 
### [v1.3.0] - Implementación de Innovaciones
- Mejora de experiencia de usuario


---

## 📅 MVP - Story Map

| Etapa            | Tarea                                           |
| ---------------- | ----------------------------------------------- |
| ✨ Inicio         | Crear BD, configurar servidor y frontend        |
| 🔄 Conexión      | Conectar backend a PostgreSQL y frontend        |
| 🔢 CRUD          | Crear, obtener, actualizar y eliminar productos |
| 📑 Validaciones  | Validar datos con Zod y middleware              |
| 📈 Visualización | Mostrar productos, editar, eliminar             |
| 💼 Pruebas       | Agregar pruebas unitarias e integración         |
| 📖 Documentación | Swagger, histórico, README                      |
| 🌐 Deployment    | Subida a Render + Vercel                        |
| ✨ Innovación     | Switch visual para disponibilidad               |

---

## 📄 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/proyecto_fierro.git
```

2. Restaura la base de datos:

```bash
createdb -U postgres proyecto_fierro
psql -U postgres -d proyecto_fierro -f proyecto_fierro.sql
```

3. Variables de entorno:

### Backend - `.env`

```
PORT=4000
DATABASE_URL=postgres://proyecto_user:tu_password@localhost:5432/proyecto_fierro
```

### Frontend - `.env.local`

```
VITE_API_URL=http://localhost:4000/api
```

---

## 🚀 Ejecución

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📃 Documentación API (Swagger)

Disponible en `http://localhost:4000/api-docs`

### Endpoints principales:

* `GET /api/products` - Obtener todos los productos
* `GET /api/products/:id` - Producto por ID
* `POST /api/products` - Crear producto
* `PUT /api/products/:id` - Actualizar
* `PATCH /api/products/:id/availability` - Cambiar disponibilidad
* `DELETE /api/products/:id` - Eliminar producto

---

## 🔧 Pruebas realizadas

* Supertest para endpoints: crear, leer, actualizar, eliminar
* Validaciones con Zod (precio > 0, campos obligatorios)
* Code coverage con Jest
* Pruebas forzando errores (try-catch)

---

## ⚙ Deployment

### Backend (Render)

1. Crear servicio web en Render
2. Agregar variable `DATABASE_URL`
3. Hacer deploy desde GitHub

### Frontend (Vercel)

1. Crear proyecto en Vercel
2. Importar desde GitHub (carpeta `client/`)
3. Definir `VITE_API_URL` como variable de entorno

---

## ✨ Funcionalidad innovadora

**Ordenar productos**:

* Mejora visual de los productos.
* Ordena por diferentes columnas (nombre, precio, disponibilidad).
* Permite ordenar de forma ascendente o descendente.

**Exportación de los productos a Excel**
* Exportación automática
* Facilita la gestión y respaldo de productos
* Generación de reportes fuera del sistema

---

## 📚 Evaluación de rubrica

| Criterio                                    | Estado |
| ------------------------------------------- | ------ |
| Backend (Node + Express + TypeScript)       | ✅      |
| Pruebas (Jest, Supertest)                   | ✅      |
| Frontend (React + Tailwind + Zod + Routing) | ✅      |
| Documentación Swagger                       | ✅      |
| Deployment (Render y Vercel)                | ✅      |
| Historial de versiones                      | ✅      |
| Story Map (MVP)                             | ✅      |
| Innovación propuesta                        | ✅      |

---
Sprint del proyecto completo

🚀 Proyecto listo para entrega y demostración.

Proyecto semestre Enero-Junio 2025 Ingeniería de Software
Instituto Tecnológico de Celaya

