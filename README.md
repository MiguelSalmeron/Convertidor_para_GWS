# Adaptador de Logo para Google Workspace

Herramienta web para convertir logos al formato requerido por Google Workspace (320 x 132 px), manteniendo proporcion, centrando el contenido y exportando en PNG.

## Demo (Cloudflare Pages)

Una vez desplegado, tu sitio quedara disponible en una URL como:

- https://tu-proyecto.pages.dev

## Stack

- React 19
- Vite 8
- lucide-react

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre la URL local que muestra la terminal (normalmente http://localhost:5173).

## Build de produccion

```bash
npm run build
npm run preview
```

## Deploy gratis en Cloudflare Pages

Pasos:

1. Sube este proyecto a un repositorio de GitHub.
2. En Cloudflare, ve a `Workers & Pages` y luego `Create application`.
3. Elige `Pages` y conecta tu repositorio de GitHub.
4. Configura el build asi:
	- `Framework preset`: `Vite`
	- `Build command`: `npm run build`
	- `Build output directory`: `dist`
5. Haz clic en `Save and Deploy`.

Cuando termine, Cloudflare te dara una URL publica `.pages.dev`.

Este proyecto incluye fallback SPA en [public/_redirects](public/_redirects) para recargar rutas sin error 404.

## Uso

1. Sube un archivo PNG/JPG.
2. Revisa la vista previa 320 x 132.
3. Descarga el archivo final en PNG.

## Portafolio GitHub

Para que luzca mejor en tu portafolio:

- Agrega un screenshot en la descripcion del repo.
- Fija este repo en tu perfil de GitHub.
- En el About del repo, pega la URL publica de Cloudflare Pages.
