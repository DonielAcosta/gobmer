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

## Paleta (logo M de Mérida)

| Token | Hex | Uso |
|-------|-----|-----|
| Navy | `#0a1f3d` | Fondo institucional |
| Blue | `#1a3a6b` | Texto / estructura |
| Sky | `#4eb3e8` | Acento azul del logo |
| Green | `#008c45` | Acento verde del logo |
| Red | `#e30613` | Estrella / acento rojo |

## Scripts

```bash
cd GOBME
npm install
npm run dev
```

En desarrollo, Vite hace proxy de `/oci-api` → OCI para evitar CORS.

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
| `/noticias` | Listado paginado |
| `/noticias/:id` | Detalle de noticia |
| `/secretarias/:slug` | Detalle de secretaría |
