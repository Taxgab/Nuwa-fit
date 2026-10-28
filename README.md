# NUWA Fit — Landing page

Landing page de una sola página para **NUWA Fit**, box de CrossFit y entrenamiento funcional
en Lomas de Zamora, pensada para presentar las clases y convertir visitas en consultas por
WhatsApp o Instagram.

El proyecto es una implementación real y navegable (no un prototipo estático). Todos los
datos comerciales están centralizados y los que todavía no fueron confirmados por el gimnasio
se muestran explícitamente como pendientes: no hay direcciones, horarios, reseñas ni
cantidades de alumnos inventadas.

## Stack

- [Astro](https://astro.build/) 5 (salida estática, sin framework de UI adicional)
- TypeScript en modo `strict`
- Tailwind CSS v4 mediante `@tailwindcss/vite`
- npm como gestor de paquetes
- Destino de despliegue previsto: Vercel (todavía sin publicar)

## Requisitos

- Node.js `20.19+` o `22.12+`
- npm `10+`

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Astro informa la URL local (por defecto `http://localhost:4321`).

## Comandos

| Comando           | Qué hace                                              |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente        |
| `npm run build`   | Compila el sitio estático en `dist/`                  |
| `npm run preview` | Sirve `dist/` para revisar el resultado compilado     |
| `npm run check`   | Verificación de tipos y diagnósticos de Astro         |

## Configuración

Todo el contenido editable vive en **`src/data/site.ts`**. Las variables de entorno son
opcionales y permiten pisar esos valores sin tocar el código; ver `.env.example`.

| Variable                  | Para qué sirve                                                    |
| ------------------------- | ----------------------------------------------------------------- |
| `PUBLIC_WHATSAPP_NUMBER`  | Número internacional, solo dígitos (`5491123456789`)              |
| `PUBLIC_WHATSAPP_MESSAGE` | Mensaje inicial precargado en WhatsApp                            |
| `PUBLIC_INSTAGRAM_URL`    | URL del perfil de Instagram                                       |
| `PUBLIC_INSTAGRAM_HANDLE` | Usuario visible (`@nuwa.fit`); se deduce desde la URL si falta    |
| `PUBLIC_GYM_ADDRESS`      | Dirección que se muestra en contacto y footer                     |
| `PUBLIC_MAPS_URL`         | Enlace a Google Maps de la ubicación exacta                       |
| `PUBLIC_SITE_URL`         | URL de producción para `canonical` y Open Graph absolutos         |

Creá un archivo `.env` a partir de `.env.example` para desarrollo local. En Vercel, cargá las
mismas variables en *Project Settings → Environment Variables*.

> `PUBLIC_` significa que el valor se expone en el navegador. Nunca guardes secretos acá.

Mientras `PUBLIC_WHATSAPP_NUMBER` esté vacío se usa el valor por defecto de `src/data/site.ts`
(hoy el número real del gimnasio). Si ese valor también se borra, los botones no muestran un
enlace roto: llevan a la sección de contacto y esa sección indica que el número está pendiente
de confirmación.

## Cómo actualizar el contenido

### Datos de contacto y textos

1. Abrí `src/data/site.ts`.
2. Editá `contact`, `site` o los arreglos `activities`, `pillars` y `steps`.
3. Los horarios están en `hours`; mientras el arreglo esté vacío la sección no muestra horarios.

### Actividades

Cada actividad tiene un campo `status`:

- `"pending"`: propuesta, todavía no confirmada. La tarjeta muestra el chip **A confirmar**.
- `"confirmed"`: actividad confirmada por el gimnasio. El chip desaparece.

Cambiá el estado únicamente cuando el cliente confirme la actividad, y ajustá `title`,
`summary` y `focus` a la oferta real.

### Fotografías

Las fotos que se ven en el sitio son reales del box. Se prepararon a partir del material que
envió el cliente y viven en `public/images/`:

| Archivo | Uso |
| --- | --- |
| `hero.jpg` | Imagen principal del hero |
| `box-01.jpg`, `box-02.jpg`, `box-03.jpg` | Galería de la sección "El box" |
| `logo-nuwa.png` | Logotipo oficial con fondo transparente |

Los originales sin procesar quedan en `assets/source/` (fuera de `public/`, por lo tanto no se
despliegan).

Para cambiar una foto:

1. Guardá el archivo optimizado en `public/images/` (JPG, ancho recomendado ≥ 1200 px).
2. Actualizá `site.images.hero` / `site.images.heroAlt` o el arreglo `gallery` en
   `src/data/site.ts`, incluyendo `width` y `height` reales para evitar saltos de layout.

> Las fotos actuales son recortes del feed de Instagram (≈ 400 px de ancho y algunas con la
> marca de agua de NUWA). Se ven bien en la galería a tamaño nativo, pero el hero queda algo
> justo en pantallas grandes: conviene reemplazarlas por los originales en alta resolución.

### Identidad y color

- El logotipo oficial (`public/images/logo-nuwa.png`) se derivó del PNG que envió el cliente:
  se le quitó el fondo negro y se conservó la N blanca, el wordmark y los triángulos azules.
- El favicon (`public/favicon.png`) usa la N del logotipo sobre un cuadrado azul `#116FB5`.
- La paleta del sitio sigue la marca: negro `#0B0C0A`, azul de marca `#116FB5` para
  superficies y botones, y azul claro `#6DB4F0` para textos y detalles sobre fondo oscuro
  (el azul puro no alcanza el contraste AA como texto pequeño).
- El bloque de conversión es blanco con tipografía negra: máximo contraste y coherencia con el
  logotipo, que también es blanco sobre negro.

### Metadatos y Open Graph

- Título y descripción: `site.seo` en `src/data/site.ts`.
- Imagen social: `public/og-image.png` (1200 × 630), generada con el logotipo real, el titular
  y los datos de la sede.
- Favicon: `public/favicon.png`.

## Estructura

```text
.
├── assets/
│   └── source/              # material original del cliente (no se despliega)
├── public/
│   ├── favicon.png
│   ├── images/
│   │   ├── logo-nuwa.png
│   │   ├── hero.jpg
│   │   ├── box-01.jpg
│   │   ├── box-02.jpg
│   │   └── box-03.jpg
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Activities.astro
│   │   ├── ActivityCard.astro
│   │   ├── BoxGallery.astro
│   │   ├── ChannelCard.astro
│   │   ├── ContactCTA.astro
│   │   ├── ContactSection.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── HeroVisual.astro
│   │   ├── Icon.astro
│   │   ├── Logo.astro
│   │   └── ValueProposition.astro
│   ├── data/
│   │   └── site.ts          # contenido y configuración editables
│   ├── layouts/
│   │   └── BaseLayout.astro # <head>, SEO, Open Graph, skip link
│   ├── pages/
│   │   └── index.astro      # composición de la landing
│   ├── styles/
│   │   └── global.css       # tokens de diseño, componentes y motion
│   └── env.d.ts             # tipos de las variables públicas
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── .env.example
```

## Decisiones de implementación

- **Sin JavaScript de framework.** El único script es el toggle del menú móvil (≈20 líneas).
- **Sin formularios falsos.** Los formularios que no envían datos a ningún backend generan
  consultas perdidas; por eso la conversión se resuelve con enlaces reales a WhatsApp,
  Instagram y Maps.
- **Sin datos inventados.** Reseñas, puntuaciones y cantidad de alumnos no se publican. La
  dirección, los horarios y las clases provienen del perfil público del gimnasio y su listado
  de Google, y quedan documentados en `src/data/site.ts` para poder corregirlos.
- **Sin promesas de resultado.** Los textos hablan de constancia, técnica y comunidad, no de
  resultados garantizados ni de salud.
- **Accesibilidad.** HTML semántico, skip link, foco visible, `aria-expanded` en el menú móvil,
  cierre con `Escape`, contraste alto y soporte de `prefers-reduced-motion`.
- **Rendimiento.** Página estática, una sola hoja de estilos, sin imágenes pesadas y sin
  librerías de animación.

## Despliegue en Vercel (pasos futuros)

1. Subir el repositorio a GitHub (`Taxgab/Nuwa-fit`) con la rama `feat/nuwa-landing`.
2. En Vercel, *Add New → Project* e importar el repositorio.
3. Framework preset: **Astro** (build `npm run build`, output `dist`).
4. Cargar las variables `PUBLIC_*` definidas en `.env.example`.
5. Configurar `PUBLIC_SITE_URL` con el dominio final para que `canonical` y Open Graph sean
   absolutos.
6. Verificar el preview de Vercel antes de promover a producción.

Nada de esto se ejecutó todavía: el proyecto no fue publicado ni desplegado.

## Información pendiente de confirmar con el cliente

Los datos de contacto, la dirección, los horarios y las clases ya están cargados en
`src/data/site.ts` a partir del perfil de Instagram, el listado de Google del gimnasio y su
sistema de reservas. Falta confirmar:

- [ ] Fotos en alta resolución: las actuales son recortes de Instagram (≈ 400 px) y algunas
      tienen la marca de agua del feed.
- [ ] Detalle de los programas **Power Gap** y **Gap** (en qué consisten, nivel e intensidad).
      Hoy las tarjetas solo invitan a consultarlos por WhatsApp.
- [ ] Segunda sede en **Monte Grande** (Av. Boulevard Buenos Aires 946): la landing muestra
      solo Lomas de Zamora. Definir si se agrega una sección o un selector de sede.
- [ ] Enlace de reservas online (`nuwalomas.turnosweb.com`): hoy la conversión va por WhatsApp.
- [ ] Dominio final (para `PUBLIC_SITE_URL`, canonical y Open Graph absolutos).
- [ ] Datos legales: razón social, datos fiscales y política de privacidad si se agrega algún
      formulario en el futuro.

## Estado del repositorio

- Rama de trabajo: `feat/nuwa-landing`.
- `main` no fue modificada.
- Los cambios **no** fueron commiteados, pusheados, mergeados ni desplegados: quedan en el
  working tree para revisión.
