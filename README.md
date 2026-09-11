# INFOCOM WEB V5 — COLOR & SHAPES

Versión visual mejorada del sitio INFOCOM, con más color, siluetas de gorras diferenciadas y renders de producto más trabajados.

## Correcciones principales

- Imágenes de productos y banners convertidas a **PNG locales**
- 12 gorras con siluetas visuales diferenciadas (59FIFTY, 9FIFTY, 9FORTY, 9SEVENTY, 39THIRTY y estilos curvos/planos)
- Paleta de acentos lima, cyan, rosa, naranja y violeta integrada de forma controlada
- Fondos, tarjetas y banners con iluminación y profundidad visual para evitar imágenes rotas al abrir el sitio desde ZIP, Windows o GitHub Pages.
- Rutas de imágenes simplificadas y consistentes.
- Barra superior corregida para evitar textos montados.
- Navegación y mega menú corregidos.
- Tipografías pequeñas aumentadas para evitar problemas con configuraciones de tamaño mínimo del navegador.
- Diseño responsive para escritorio, tablet y móvil.
- Catálogo de 12 productos.
- Filtros, ordenamiento, búsqueda, favoritos y carrito.
- Carrito y favoritos guardados en `localStorage`.
- Modal de producto con clic sobre cualquier tarjeta.
- Menú móvil funcional.
- Banners e identidad visual originales de INFOCOM.

## Abrir

1. Descomprime el ZIP.
2. Abre `index.html`.
3. No necesitas instalar Node.js ni ejecutar un servidor para esta versión.

## Estructura

```text
INFOCOM_WEB_V4_FIXED/
├── assets/
│   ├── banners/
│   │   ├── collection.png
│   │   └── sport.png
│   ├── logo/
│   │   └── infocom.png
│   └── products/
│       ├── 01.png ... 12.png
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
└── README.md
```

### Nota
Esta es una base front-end profesional. Para producción real todavía habría que conectar pagos, inventario, autenticación, pedidos, base de datos, envíos y un backend.
