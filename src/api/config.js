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

/** Menú principal (igual al portal oficial) */
export const NAV = {
  contrataciones: 'https://gobernacion.merida.gob.ve/Contrataciones',
  quienesSomos: [
    {
      label: 'Plan de Gobierno',
      href: '/plan-de-gobierno',
      external: false,
    },
    {
      label: 'Reseña Histórica',
      href: '/resena-historica',
      external: false,
    },
    {
      label: '7 Líneas de Transformación',
      href: '/#secretarias',
      external: false,
      children: [
        {
          label: 'Secretaría para la Transformación Económica',
          href: '/secretarias/secretaria-para-la-transformacion-economica',
        },
        {
          label:
            'Secretaría para la Transformación de la Ciudad Humana para el Buen Vivir',
          href: '/secretarias/transformacion-de-la-ciudad-humana-para-el-buen-vivir',
        },
        {
          label:
            'Secretaría para la Transformación de la Seguridad Ciudadana, Defensa y Paz',
          href: '/secretarias/secretaria-para-la-transformacion-de-la-seguridad-ciudadana-defensa-y-paz',
        },
        {
          label: 'Secretaría para la Transformación Social',
          href: '/secretarias/secretaria-para-la-transformacion-social',
        },
        {
          label:
            'Secretaría para la Transformación Política y del Poder Popular',
          href: '/secretarias/secretaria-para-la-transformacion-politica-y-del-poder-popular',
        },
        {
          label:
            'Secretaría para la Transformación del Ecosocialismo, Ciencia y Tecnología',
          href: '/secretarias/secretaria-para-la-transformacion-del-ecosocialismo-ciencia-y-tecnologia',
        },
        {
          label:
            'Secretaría para la Transformación Geopolítica de Paz e Integración',
          href: '/secretarias/secretaria-para-la-transformacion-geopolitica-de-paz-e-integracion',
        },
      ],
    },
  ],
}

/** Contenido local — Reseña Histórica */
export const RESENA_HISTORICA = {
  title: 'Reseña Histórica',
  subtitle: 'Gobernación del Estado Bolivariano de Mérida',
  lead:
    'Desde su fundación en el siglo XVI, Mérida ha tejido una identidad andina de fe, cultura, universidad y servicio público. Esta reseña recoge hitos que dan forma al Estado Bolivariano de Mérida y a su compromiso con el pueblo.',
  tagline:
    '7 líneas de transformación alineadas con la necesidad del pueblo merideño para su desarrollo sustentable',
  milestones: [
    {
      year: '1558',
      title: 'Fundación de Mérida',
      text: 'El 9 de octubre, el capitán Juan Rodríguez Suárez funda la ciudad cerca de la Laguna de Urao, en honor a Mérida de Extremadura (España).',
    },
    {
      year: '1559',
      title: 'Santiago de los Caballeros de Mérida',
      text: 'Juan de Maldonado traslada y consolida la ciudad en la meseta de los Tatuyes, entre los ríos Chama, Albarregas y Mucujún, con el nombre que la identifica hasta hoy.',
    },
    {
      year: '1622',
      title: 'Gobernación de Mérida',
      text: 'El territorio asciende a gobernación, consolidando una administración propia en los Andes venezolanos bajo dependencia de la Real Audiencia.',
    },
    {
      year: '1810–1830',
      title: 'Independencia y provincia',
      text: 'Mérida participa del proceso emancipador y se organiza como provincia en el nacimiento de la República de Venezuela.',
    },
    {
      year: '1899–1909',
      title: 'Estado Mérida',
      text: 'Queda definido el marco territorial del estado Mérida, base de la entidad federal que conocemos en la actualidad.',
    },
    {
      year: 'Hoy',
      title: 'Estado Bolivariano de Mérida',
      text: 'La Gobernación impulsa siete líneas de transformación para el desarrollo sustentable, la paz y el buen vivir del pueblo merideño.',
    },
  ],
  infografias: [
    {
      src: '/resena/infografia-1.png',
      alt: 'Infografía — Fundación de Mérida (parte 1)',
    },
    {
      src: '/resena/infografia-2.png',
      alt: 'Infografía — Fundación de Mérida (parte 2)',
    },
  ],
}

/** Contenido local — Plan de Gobierno */
export const PLAN_GOBIERNO = {
  title: 'Plan de Gobierno',
  subtitle: 'Gobernación del Estado Bolivariano de Mérida',
  lead:
    'La Administración Pública está al servicio del Pueblo y se fundamenta en los principios de honestidad, participación, celeridad, eficacia, eficiencia, transparencia, rendición de cuentas y responsabilidad en el ejercicio de la función pública, con sometimiento pleno a la ley y al derecho.',
  tagline:
    '7 líneas de transformación alineadas con la necesidad del pueblo merideño para su desarrollo sustentable',
  gobernador: {
    name: 'Arnaldo Sánchez',
    role: 'Gobernador del Estado Bolivariano de Mérida',
    image: '/plan/gobernador.jpg',
  },
  lineas: [
    {
      id: 1,
      title: 'Transformación Económica',
      image: '/plan/linea-1.png',
      pdf: '/plan/linea-1.pdf',
      slug: 'secretaria-para-la-transformacion-economica',
    },
    {
      id: 2,
      title: 'Transformación de la Ciudad Humana para el Buen Vivir',
      image: '/plan/linea-2.png',
      pdf: '/plan/linea-2.pdf',
      slug: 'transformacion-de-la-ciudad-humana-para-el-buen-vivir',
    },
    {
      id: 3,
      title: 'Transformación de la Seguridad Ciudadana, Defensa y Paz',
      image: '/plan/linea-3.png',
      pdf: '/plan/linea-3.pdf',
      slug: 'secretaria-para-la-transformacion-de-la-seguridad-ciudadana-defensa-y-paz',
    },
    {
      id: 4,
      title: 'Transformación Social',
      image: '/plan/linea-4.png',
      pdf: '/plan/linea-4.pdf',
      slug: 'secretaria-para-la-transformacion-social',
    },
    {
      id: 5,
      title: 'Transformación Política y del Poder Popular',
      image: '/plan/linea-5.png',
      pdf: '/plan/linea-5.pdf',
      slug: 'secretaria-para-la-transformacion-politica-y-del-poder-popular',
    },
    {
      id: 6,
      title: 'Transformación del Ecosocialismo, Ciencia y Tecnología',
      image: '/plan/linea-6.png',
      pdf: '/plan/linea-6.pdf',
      slug: 'secretaria-para-la-transformacion-del-ecosocialismo-ciencia-y-tecnologia',
    },
    {
      id: 7,
      title: 'Transformación Geopolítica de Paz e Integración',
      image: '/plan/linea-7.png',
      pdf: '/plan/linea-7.pdf',
      slug: 'secretaria-para-la-transformacion-geopolitica-de-paz-e-integracion',
    },
  ],
}

/** Gaceta destacada (sitio oficial) */
export const GACETA = {
  label: 'Descargar Gaceta Oficial 6119',
  href: 'https://gobernacion.merida.gob.ve/wp-content/uploads/2025/08/GAC.6119.DEC_.017.-CREACION-DE-LAS-SECRETARIAS-RECTORAS.pdf',
}

/** Enlaces institucionales — logos visibles en gobernacion.merida.gob.ve */
export const ENLACES = [
  {
    id: 'corposalud',
    title: 'Corposalud',
    description: 'Corporación de Salud del Estado Mérida',
    href: 'https://corposalud.merida.gob.ve/',
    icon: '/enlaces/corposalud.png',
  },
  {
    id: 'iahula',
    title: 'IAHULA',
    description: 'Instituto Autónomo Hospital Universitario de Los Andes',
    href: 'https://iahula.merida.gob.ve/',
    icon: '/enlaces/iahula.png',
  },
  {
    id: 'teleinformatica',
    title: 'Teleinformática',
    description: 'Dirección Estadal del Poder Popular de Teleinformática',
    href: 'https://teleinformatica.merida.gob.ve/',
    icon: '/enlaces/teleinformatica.png',
  },
  {
    id: 'auditoria-interna',
    title: 'Auditoría Interna',
    description: 'Sistema Nacional de Control Fiscal',
    href: 'https://auditoriainterna.merida.gob.ve/',
    icon: '/enlaces/auditoria-interna.png',
  },
  {
    id: 'pgem',
    title: 'Procuraduría (PGEM)',
    description: 'Procuraduría General del Estado Mérida',
    href: 'https://pgemweb.merida.gob.ve/gooo.php',
    icon: '/enlaces/pgem.jpg',
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
    description: 'Dirección Estadal del Poder Popular de Gestión Comunicacional',
    href: 'https://oci.merida.gob.ve/',
    icon: '/enlaces/gestion-comunicacional.png',
  },
  {
    id: 'iaanem',
    title: 'IAANEM',
    description: 'Instituto Autónomo de Alimentación y Nutrición del Estado Mérida',
    href: 'https://iaanem.merida.gob.ve/',
    icon: '/enlaces/iaanem.png',
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
    title: 'FUNNJOMER',
    description: 'Fundación Niños, Niñas y Jóvenes de los Andes Merideños',
    href: 'https://fundaciondelnino.merida.gob.ve/',
    icon: '/enlaces/funnjomer.png',
  },
  {
    id: 'imdafef',
    title: 'IMDAFEF',
    description: 'Instituto Merideño de Deporte, Actividad Física y Educación Física',
    href: 'https://www.imdafef.merida.gob.ve/',
    icon: '/enlaces/imdafef.png',
  },
  {
    id: 'cenacadem',
    title: 'CENACADEM',
    description: 'Centro Nacional de Ciencias Aplicadas al Deporte del Estado Mérida',
    href: 'http://cenacadem.merida.gob.ve/',
    icon: '/enlaces/cenacadem.png',
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
  try {
    return SECRETARIA_IDS.map((id) => {
      const meta = SECRETARIA_META[id] || {}
      return {
        id,
        slug: meta.slug || `secretaria-${id}`,
        title: meta.title || 'Secretaría',
        excerpt: meta.excerpt || '',
        content: `<p>${meta.excerpt || ''}</p>`,
        link: meta.slug ? `https://gobernacion.merida.gob.ve/${meta.slug}/` : '#',
        short: meta.short || '',
        accent: meta.accent || 'var(--brand-blue)',
        icon: meta.icon || null,
        intro: [meta.excerpt].filter(Boolean),
        entities: [],
        relatedNews: [],
        offline: true,
      }
    })
  } catch (err) {
    console.warn('[config] Error al generar fallback de secretarías:', err)
    return []
  }
}

export const PER_PAGE = 8
