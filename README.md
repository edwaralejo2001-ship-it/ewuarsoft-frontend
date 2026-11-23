# EwuarSoft - Front-End Web (Tienda y Licores La Farra)
## GA8-220501096-AA1-EV01: Despliegue de Servicios Web
**Aprendiz:** Edwar Montoya  
**Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO) - SENA

---

## 1. Descripción
Front-End web moderno, interactivo y completamente responsivo de **Tienda y Licores La Farra**, desarrollado en **JavaScript Puro (Vanilla JS ES6+)**, **HTML5** y **CSS3** nativo como una *Single Page Application* (SPA).

La aplicación se comunica de forma asíncrona mediante peticiones HTTP `fetch` con el backend de EwuarSoft en Node.js/Express y persiste en MySQL.

---

## 2. Características del Front-End
- 🔐 **Autenticación Completa:** Inicio de sesión, registro de nuevos usuarios, medidor de seguridad de contraseñas y accesos rápidos de demostración (Admin, Cajero, Usuario).
- 📊 **Dashboard en Tiempo Real:** Indicador de estado de conexión a MySQL, 4 tarjetas métricas, alertas críticas de stock y registro de últimas ventas.
- 🛒 **Punto de Venta (POS):** Catálogo interactivo por categorías, control de cantidades con bloqueo estricto si no hay stock en bodega y generación de ticket de venta térmico (`window.print()`).
- 📦 **Recepción de Pedidos & Control de Existencias:**
  - Panel dinámico para **Sumar al Stock (Entrada/Pedido)** o **Descontar del Stock (Salida/Avería)**.
  - Calculadora por cajas/pacas o unidades sueltas con descuento automático de mermas/roturas.
  - **Buscador predictivo e inteligente:** Filtrado en tiempo real por nombre de producto o SKU sin listas engorrosas.
- 🏷️ **Catálogo de Productos & Proveedores:** Creación de productos con pedido de apertura / stock inicial y gestión de categorías.
- 📈 **Módulo de Reportes:** Ventas por rango de fechas, inventario valorizado y alertas de bajo stock con exportación a CSV.

---

## 3. Estructura del Repositorio
```text
ewuarsoft-frontend/
├── css/
│   └── style.css          # Estilos personalizados, responsive design, variables CSS
├── js/
│   ├── api.js             # Cliente API REST y configuración de URL de producción
│   └── app.js             # Lógica SPA, buscador predictivo, calculadora y eventos
├── index.html             # Documento principal SPA con todas las vistas modulares
├── .gitignore             # Archivos excluidos de Git
└── README.md              # Documentación técnica y guía de despliegue
```

---

## 4. Configuración de Conexión con el Backend

Abre el archivo `js/api.js`. En las primeras líneas encontrarás la constante `CLOUD_BACKEND_URL`:

```javascript
// En producción (Netlify, Vercel, GitHub Pages), asigna la URL pública de tu backend en la nube:
const CLOUD_BACKEND_URL = 'https://tu-backend.onrender.com';
```

- **Si está vacía `''`:** El frontend se comunicará automáticamente con `http://localhost:3000` (ideal para desarrollo local).
- **En la nube:** Al colocar la URL de tu backend desplegado en Render (o Railway), el frontend enviará todas las solicitudes hacia tu servidor en internet sin necesidad de configuraciones adicionales.

---

## 5. Instrucciones de Despliegue en la Nube (Gratis)

### Opción 1: Despliegue Instantáneo en Netlify (Recomendado)
1. Inicia sesión en [Netlify](https://www.netlify.com/).
2. Puedes desplegarlo de dos formas:
   - **Arrastrar y soltar (Manual):** Ve a la sección **Sites** y arrastra toda la carpeta `ewuarsoft-frontend` directamente sobre el recuadro *"Drag and drop your site output folder here"*. En 5 segundos estará en línea.
   - **Vía GitHub (Automático):** Conecta tu cuenta de GitHub, selecciona el repositorio `ewuarsoft-frontend`, deja el *Publish directory* en blanco (o `.`) y pulsa **Deploy**.
3. Netlify te generará una URL pública con HTTPS (ej: `https://ewuarsoft.netlify.app`).

### Opción 2: Despliegue en Vercel
1. Inicia sesión en [Vercel](https://vercel.com/).
2. Haz clic en **Add New... > Project** e importa el repositorio `ewuarsoft-frontend`.
3. Selecciona **Other** como Framework Preset y haz clic en **Deploy**.
4. Vercel te entregará una URL pública gratuita (ej: `https://ewuarsoft.vercel.app`).

### Opción 3: Despliegue en GitHub Pages
1. Sube este repositorio a tu cuenta de GitHub.
2. Ve a **Settings > Pages**.
3. En **Source**, selecciona `Deploy from a branch`, elige la rama `main` y la carpeta `/ (root)`.
4. Guarda los cambios. Tu aplicación estará disponible en `https://<tu-usuario>.github.io/ewuarsoft-frontend/`.

---

## 6. Ejecución en Local
Para probar la aplicación en tu computador local:
1. Asegúrate de que el backend esté ejecutándose en `http://localhost:3000`.
2. Abre `index.html` directamente en tu navegador o haz clic derecho y selecciona **"Open with Live Server"** en VS Code.
