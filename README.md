# Frontend de Gestión de Inventario

Este proyecto es una aplicación frontend para gestionar datos de inventario de equipos almacenados en un archivo Excel. Proporciona una interfaz amigable para visualizar, buscar, agregar, editar y eliminar elementos del inventario, comunicándose con un backend Node.js que lee y escribe en el archivo Excel. Esta hecho con simple html, css y javascript que lee y escribe datos de una hoja xlsx.

## Funcionalidades

- **Visualización de Inventario:** Muestra todos los elementos del inventario en una tabla responsiva.
- **Búsqueda/Filtrado:** Permite buscar elementos ingresando texto en la caja de búsqueda. La tabla mostrará solo las filas donde alguna celda coincida exactamente con el texto buscado (no distingue mayúsculas/minúsculas).
- **Agregar Nuevo Elemento:** Haz clic en el botón "Añadir" para abrir un formulario y agregar un nuevo elemento al inventario. El nuevo elemento se guarda directamente en el archivo Excel.
- **Editar Elemento:** Haz clic en "Editar" en cualquier fila para habilitar la edición de la línea. Haz clic en "Guardar" para guardar los cambios, que se escriben en el archivo Excel.
- **Eliminar Elemento:** Haz clic en "Borrar" para eliminar un elemento del inventario y del archivo Excel.
- **Navegación:** Botón "Volver" en el formulario de alta para regresar a la tabla principal.
- **Diseño Responsivo:** La tabla y los formularios están diseñados para adaptarse a diferentes tamaños de pantalla.

## Estructura del Proyecto

```
frontend
├── public
│   ├── index.html       # Página principal (tabla de inventario)
│   └── add.html         # Formulario para agregar nuevos elementos
├── src
│   ├── app.js           # Lógica JS para tabla, búsqueda, edición y borrado
│   ├── add.js           # Lógica JS para el formulario de alta
│   └── styles.css       # Estilos CSS de la aplicación
└── README.md            # Documentación del proyecto
```

## Instrucciones de Instalación

1. **Clona el repositorio**:
   ```
   git clone <url-del-repositorio>
   ```

2. **Instala las dependencias**:
   Asegúrate de tener Node.js instalado. Luego ejecuta:
   ```
   npm install
   npm install xlsx (modulo para que Node pueda leer y escribir en archivos Excel)
   ```

3. **Ejecuta el backend** (desde la carpeta raíz del proyecto, no desde frontend):
   ```
   node server.js
   ```
   El backend debe estar en funcionamiento para que el frontend pueda obtener y actualizar los datos.

4. **Abre el frontend**:
   Abre `public/index.html` en tu navegador, o utiliza un servidor local (como Live Server en VS Code) para mejores resultados.

## Uso

- **Visualización:** La página principal muestra todos los elementos del inventario desde el archivo Excel.
- **Búsqueda:** Ingresa un término en la caja de búsqueda y haz clic en "Buscar" para filtrar la tabla.
- **Agregar:** Haz clic en "Añadir", completa el formulario y haz clic en "OK" para agregar un nuevo elemento.
- **Editar:** Haz clic en "Editar" en una fila, modifica los campos y luego haz clic en "Guardar" para guardar los cambios.
- **Eliminar:** Haz clic en "Borrar" para eliminar un elemento.
- **Navegación:** Usa el botón "Volver" en el formulario de alta para regresar a la tabla principal.

## API del Backend

- `GET /api/inventory` — Obtiene todos los elementos del inventario.
- `POST /api/inventory` — Agrega un nuevo elemento (requiere JSON en el body).
- `PUT /api/inventory` — Actualiza un elemento existente (requiere JSON con `id`).
- `DELETE /api/inventory/:id` — Elimina un elemento por `id`.
