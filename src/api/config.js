/**
 * GOBME — sitio oficial.
 * Contenidos: WordPress OCI.
 * Logos/iconos locales desde gobernacion.merida.gob.ve (public/).
 */
const isDev = import.meta.env.DEV

export const API = isDev
  ? '/oci-api'
  : 'https://oci.merida.gob.ve/wp-json/wp/v2'

export const OCI_SITE = 'https://oci.merida.gob.ve'

export const ASSETS = {
  logoHorizontal: '/logos/logo-horizontal.png',
  logoMark: '/logos/logo-mark.png',
  banner: '/logos/banner-gbem.png',
  hero: '/hero.jpg',
  favicon: '/favicon.png',
}

export const SOCIAL = {
  youtube: 'https://www.youtube.com/@ArnaldoSanchez19',
  instagram: 'https://www.instagram.com/arnaldosanchezp/?hl=es',
  oci: 'https://oci.merida.gob.ve/',
}

/** Gaceta destacada (sitio oficial) */
export const GACETA = {
  label: 'Descargar Gaceta Oficial 6119',
  href: 'https://gobernacion.merida.gob.ve/wp-content/uploads/2025/08/GAC.6119.DEC_.017.-CREACION-DE-LAS-SECRETARIAS-RECTORAS.pdf',
}

/** Enlaces institucionales — logos desde gobernacion.merida.gob.ve */
export const ENLACES = [
  {
    id: 'corposalud',
    title: 'Corposalud',
    description: 'Corporación de Salud del Estado Mérida',
    href: 'https://corposalud.merida.gob.ve/',
    icon: '/enlaces/corposalud.png',
  },
  {
    id: 'desarrollo-social',
    title: 'Desarrollo Social',
    description: 'Secretaría de Desarrollo Social',
    href: 'https://desarrollosocial.merida.gob.ve/',
    icon: '/enlaces/desarrollo-social.png',
  },
  {
    id: 'teleinformatica',
    title: 'Teleinformática',
    description: 'D.E.P.P. Teleinformática',
    href: 'https://teleinformatica.merida.gob.ve/',
    icon: '/enlaces/teleinformatica.png',
  },
  {
    id: 'ibime',
    title: 'IBIME',
    description: 'Instituto Bolivariano de la Mujer del Estado Mérida',
    href: 'https://corposalud.merida.gob.ve/',
    icon: '/enlaces/ibime.png',
  },
  {
    id: 'oci',
    title: 'OCI',
    description: 'Oficina de Comunicación Institucional',
    href: 'https://oci.merida.gob.ve/',
    icon: '/enlaces/oci.png',
  },
  {
    id: 'auditoria-interna',
    title: 'Auditoría Interna',
    description: 'Sistema Nacional de Control Fiscal',
    href: 'https://auditoriainterna.merida.gob.ve/',
    icon: '/enlaces/auditoria-interna.png',
  },
  {
    id: 'iahula',
    title: 'IAHULA',
    description: 'Instituto Autónomo Hospital Universitario de Los Andes',
    href: 'https://iahula.merida.gob.ve/',
    icon: '/enlaces/iahula.png',
  },
  {
    id: 'pgem',
    title: 'Procuraduría (PGEM)',
    description: 'Procuraduría General del Estado Mérida',
    href: 'https://pgemweb.merida.gob.ve/gooo.php',
    icon: '/enlaces/pgem.jpg',
  },
  {
    id: 'fomdes',
    title: 'FOMDES',
    description: 'Fondo Merideño para el Desarrollo Económico Sustentable',
    href: 'https://gobernacion.merida.gob.ve/',
    icon: '/enlaces/fomdes.png',
  },
  {
    id: 'iaanem',
    title: 'IAANEM',
    description: 'Instituto Autónomo de Alimentación y Nutrición del Estado Mérida',
    href: 'https://iaanem.merida.gob.ve/',
    icon: '/enlaces/iaanem.png',
  },
  {
    id: 'agem',
    title: 'Archivo General (AGEM)',
    description: 'Archivo General del Estado Mérida',
    href: 'https://archivogeneral.merida.gob.ve/',
    icon: '/enlaces/agem.png',
  },
  {
    id: 'oam',
    title: 'OAM',
    description: 'Orquesta Andina de Mérida',
    href: 'https://oam.merida.gob.ve/',
    icon: '/enlaces/oam.jpg',
  },
  {
    id: 'immfa',
    title: 'IMMFA',
    description: 'Instituto Merideño de la Mujer y la Familia',
    href: 'https://www.immfa.merida.gob.ve/',
    icon: '/enlaces/immfa.png',
  },
  {
    id: 'gestion-comunicacional',
    title: 'Gestión Comunicacional',
    description: 'Dirección de Gestión Comunicacional',
    href: 'https://oci.merida.gob.ve/',
    icon: '/enlaces/gestion-comunicacional.png',
  },
  {
    id: 'fomficc',
    title: 'FOMFICC',
    description: 'Fondo Merideño para el Financiamiento de Consejos Comunales',
    href: 'https://fomficc.merida.gob.ve/',
    icon: '/enlaces/fomficc.png',
  },
  {
    id: 'funnjomer',
    title: 'Fundación del Niño',
    description: 'Fundación del Niño del Estado Mérida',
    href: 'https://fundaciondelnino.merida.gob.ve/',
    icon: '/enlaces/funnjomer.png',
  },
  {
    id: 'imdafef',
    title: 'IMDAFEF',
    description: 'Instituto Merideño del Deporte',
    href: 'https://www.imdafef.merida.gob.ve/',
    icon: '/enlaces/imdafef.png',
  },
  {
    id: 'cenacadem',
    title: 'CENACADEM',
    description: 'Centro Nacional Académico',
    href: 'http://cenacadem.merida.gob.ve/',
    icon: '/enlaces/cenacadem.png',
  },
  {
    id: 'consultoria',
    title: 'Consultoría Jurídica',
    description: 'Consultoría Jurídica del Estado Mérida',
    href: 'https://consultoria.merida.gob.ve/',
    icon: '/enlaces/consultoria.png',
  },
]

/** IDs de páginas de las 7 Secretarías en OCI */
export const SECRETARIA_IDS = [1017, 102, 98, 1036, 1023, 2016, 2012]

export const SECRETARIA_META = {
  1017: {
    short: 'Económica',
    accent: 'var(--accent-green)',
    icon: '/icons/economica.png',
    slug: 'secretaria-para-la-transformacion-economica',
    title: 'Secretaría para la Transformación Económica',
    excerpt:
      'Ente rector de la política económica productiva del estado, alineada con las 7 Transformaciones 2025–2031.',
  },
  102: {
    short: 'Ciudad Humana',
    accent: 'var(--brand-sky)',
    icon: '/icons/ciudad-humana.png',
    slug: 'transformacion-de-la-ciudad-humana-para-el-buen-vivir',
    title:
      'Secretaría para la Transformación de la Ciudad Humana para el Buen Vivir',
    excerpt:
      'Políticas urbanas, hábitat sostenible y calidad de vida centrada en el ser humano.',
  },
  98: {
    short: 'Seguridad',
    accent: 'var(--brand-blue)',
    icon: '/icons/seguridad.png',
    slug: 'secretaria-para-la-transformacion-de-la-seguridad-ciudadana-defensa-y-paz',
    title:
      'Secretaría para la Transformación de la Seguridad Ciudadana, Defensa y Paz',
    excerpt:
      'Articulación de seguridad ciudadana, defensa y paz en el Estado Bolivariano de Mérida.',
  },
  1036: {
    short: 'Social',
    accent: 'var(--accent-red)',
    icon: '/icons/social.png',
    slug: 'secretaria-para-la-transformacion-social',
    title: 'Secretaría para la Transformación Social',
    excerpt:
      'Políticas sociales para el bienestar colectivo y la inclusión del pueblo merideño.',
  },
  1023: {
    short: 'Política y Poder Popular',
    accent: 'var(--accent-red-deep)',
    icon: '/icons/politica.png',
    slug: 'secretaria-para-la-transformacion-politica-y-del-poder-popular',
    title:
      'Secretaría para la Transformación Política y del Poder Popular',
    excerpt:
      'Democracia participativa, organización comunal y transferencia de competencias al Poder Popular.',
  },
  2016: {
    short: 'Ecosocialismo y Ciencia',
    accent: 'var(--accent-green-bright)',
    icon: '/icons/ecosocialismo.png',
    slug: 'secretaria-para-la-transformacion-del-ecosocialismo-ciencia-y-tecnologia',
    title:
      'Secretaría para la Transformación del Ecosocialismo, Ciencia y Tecnología',
    excerpt:
      'Conservación ambiental, transición ecológica e innovación científico-tecnológica.',
  },
  2012: {
    short: 'Geopolítica de Paz',
    accent: 'var(--brand-blue-soft)',
    icon: '/icons/geopolitica.png',
    slug: 'secretaria-para-la-transformacion-geopolitica-de-paz-e-integracion',
    title:
      'Secretaría para la Transformación Geopolítica de Paz e Integración',
    excerpt:
      'Cooperación internacional, integración y políticas de paz e inclusión.',
  },
}

/** Datos locales si OCI no responde (DNS/red) */
export function getFallbackSecretarias() {
  return SECRETARIA_IDS.map((id) => {
    const meta = SECRETARIA_META[id]
    return {
      id,
      slug: meta.slug,
      title: meta.title,
      excerpt: meta.excerpt,
      content: `<p>${meta.excerpt}</p>`,
      link: `https://gobernacion.merida.gob.ve/${meta.slug}/`,
      short: meta.short,
      accent: meta.accent,
      icon: meta.icon,
      offline: true,
    }
  })
}

export const PER_PAGE = 8
