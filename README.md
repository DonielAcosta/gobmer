# GOBME

Sitio oficial de la **Gobernación del Estado Bolivariano de Mérida**.

Única fuente de datos: **WordPress OCI**

```
https://oci.merida.gob.ve/wp-json/wp/v2
```

| Contenido | Endpoint |
|-----------|----------|
| Secretarías | `/pages` (ids OCI) |
| Noticias | `/posts?_embed` |

## Stack

- Vite + React
- React Router
- CSS con variables de marca

## Paleta (Manual de Identidad)

| Token | Hex | Uso |
|-------|-----|-----|
| Azul | `#5AA5CC` | Primario institucional |
| Verde | `#15692A` | Primario institucional |
| Rojo | `#FC0F18` | Primario institucional |
| Navy | `#172840` | Texto / fondos |

## Tipografía (Manual)

| Uso | Oficial | Web |
|-----|---------|-----|
| Títulos / UI | Corbel Bold | Georama (+ Corbel/Cantarell si están) |
| “Mérida” | Billead Dandy | Great Vibes |

## Scripts

```bash
cd GOBME
npm install
npm run dev
```

En desarrollo, Vite hace proxy de `/oci-api` → OCI para evitar CORS.

Si ves `EAI_AGAIN` / `oci-proxy`, el DNS de `oci.merida.gob.ve` no está
resolviendo (falla de red o de la zona `merida.gob.ve`). La app cae a datos
locales (secretarías) y muestra aviso en noticias. Reinicia `npm run dev`
cuando el DNS vuelva.

## Assets locales

Descargados de [gobernacion.merida.gob.ve](https://gobernacion.merida.gob.ve/):

```
public/
├── favicon.png
├── hero.jpg
├── logos/
├── icons/                   # 7 secretarías
└── enlaces/                 # logos institucionales
    ├── corposalud.png
    ├── desarrollo-social.png
    ├── teleinformatica.png
    ├── ibime.png
    ├── oci.png
    ├── auditoria-interna.png
    ├── iahula.png
    ├── pgem.jpg
    ├── fomdes.png
    ├── iaanem.png
    ├── agem.png
    ├── oam.jpg
    ├── immfa.png
    ├── gestion-comunicacional.png
    ├── fomficc.png
    ├── funnjomer.png
    ├── imdafef.png
    ├── cenacadem.png
    └── consultoria.png
```

## Rutas

| Ruta | Vista |
|------|--------|
| `/` | Home (hero, secretarías, noticias) |
| `/plan-de-gobierno` | Plan de Gobierno (contenido local) |
| `/noticias` | Listado paginado |
| `/noticias/:id` | Detalle de noticia |
| `/secretarias/:slug` | Detalle de secretaría |
