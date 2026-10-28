/**
 * Single source of truth for the NUWA Fit landing page.
 *
 * Every commercial value lives here so it can be updated without touching
 * layout code. Empty strings are intentional placeholders: the UI renders an
 * explicit "pending" state instead of inventing content.
 *
 * Values can also be provided through public env vars (see `.env.example`).
 * Never put secrets in this file — everything here ships to the browser.
 */

export type IconName =
  | "arrow"
  | "check"
  | "clock"
  | "close"
  | "instagram"
  | "menu"
  | "pin"
  | "repeat"
  | "spark"
  | "target"
  | "users"
  | "whatsapp";

/** `pending` = proposed activity, not confirmed by the gym yet. */
export type ActivityStatus = "confirmed" | "pending";

export interface Activity {
  id: string;
  title: string;
  summary: string;
  focus: readonly string[];
  status: ActivityStatus;
}

export interface Pillar {
  title: string;
  text: string;
  icon: IconName;
}

export interface Step {
  title: string;
  text: string;
}

export interface OpeningHours {
  days: string;
  time: string;
}

export interface NavLink {
  label: string;
  href: string;
}

const env = import.meta.env;

/** Reads a public env var, falling back to the value committed in this file. */
const readEnv = (value: string | undefined, fallback: string): string => {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized.length > 0 ? normalized : fallback;
};

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Digits only: wa.me requires an international number without `+` or spaces.
 * 5491132808382 = "Nuwa Recepción" (verificado en wa.me). El enlace que el
 * gimnasio publica sin código de país (wa.me/91132808382) no resuelve a ningún
 * contacto, por eso acá se usa el formato internacional completo.
 */
const whatsappNumber = readEnv(env.PUBLIC_WHATSAPP_NUMBER, "5491132808382").replace(/\D/g, "");

const whatsappMessage = readEnv(
  env.PUBLIC_WHATSAPP_MESSAGE,
  "Hola NUWA, quiero consultar por las clases y los horarios.",
);

const instagramUrl = readEnv(env.PUBLIC_INSTAGRAM_URL, "https://www.instagram.com/nuwa.fit");

const instagramHandleFromUrl = instagramUrl
  ? `@${instagramUrl.replace(/\/+$/, "").split("/").pop() ?? ""}`
  : "";

const address = readEnv(env.PUBLIC_GYM_ADDRESS, "Av. Hipólito Yrigoyen 9385, Lomas de Zamora");

/** Búsqueda de Google Maps por dirección: no depende de un ID de lugar que pueda cambiar. */
const mapsUrl = readEnv(
  env.PUBLIC_MAPS_URL,
  "https://www.google.com/maps/search/?api=1&query=Av.+Hip%C3%B3lito+Yrigoyen+9385%2C+Lomas+de+Zamora",
);

const siteUrl = readEnv(env.PUBLIC_SITE_URL, "").replace(/\/+$/, "");

/**
 * Horarios publicados por el gimnasio (Instagram y listado de Google).
 * Actualizarlos acá cuando cambien: no se muestran si el arreglo está vacío.
 */
const hours: readonly OpeningHours[] = [
  { days: "Lunes a viernes", time: "07:00 – 22:00" },
  { days: "Sábados", time: "09:00 – 15:00" },
];

export const hasWhatsApp = whatsappNumber.length > 0;

/** Returns a `wa.me` link, or `null` while no number is configured. */
export const whatsappLink = (message: string = whatsappMessage): string | null => {
  if (!hasWhatsApp) return null;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const contact = {
  whatsappNumber,
  whatsappMessage,
  hasWhatsApp,
  instagramUrl,
  instagramHandle: readEnv(env.PUBLIC_INSTAGRAM_HANDLE, instagramHandleFromUrl),
  hasInstagram: instagramUrl.length > 0,
  address,
  hasAddress: address.length > 0,
  mapsUrl,
  hasMaps: mapsUrl.length > 0,
  hours,
  hasHours: hours.length > 0,
  /** Fallback target used by every CTA while WhatsApp is not configured. */
  fallbackHref: "#contacto",
} as const;

/* -------------------------------------------------------------------------- */
/* Site                                                                       */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "NUWA Fit",
  wordmark: { primary: "NUWA", secondary: "FIT" },
  tagline: "Movimiento con propósito",
  url: siteUrl,
  locale: "es_AR",
  nav: [
    { label: "Actividades", href: "#actividades" },
    { label: "El box", href: "#el-box" },
    { label: "Propuesta", href: "#propuesta" },
    { label: "Contacto", href: "#contacto" },
  ] as readonly NavLink[],
  seo: {
    title: "NUWA Fit — CrossFit y funcional en Lomas de Zamora",
    description:
      "Box de CrossFit, funcional e híbridos en Lomas de Zamora. Conocé las clases, los horarios y escribinos por WhatsApp para reservar tu lugar.",
    ogImage: "/og-image.png",
  },
  images: {
    /** Fotografía real del box (recorte del feed de NUWA). */
    hero: "/images/hero.jpg",
    heroAlt: "Alumno de NUWA ejecutando una sentadilla sobre cabeza con barra",
  },
  cta: {
    whatsapp: "Escribir por WhatsApp",
  },
  /** Supporting line placed under the hero CTAs. */
  heroSupport: "Consultas directas por WhatsApp, sin formularios ni intermediarios.",
} as const;

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Clases publicadas por el gimnasio en su perfil de Instagram y en el listado
 * de Google. `status: "confirmed"` = la actividad existe; las descripciones son
 * deliberadamente generales porque el cliente todavía no detalló cada programa.
 * Cambiá `status` a "pending" si alguna deja de dictarse (muestra "A confirmar").
 */
export const activities: readonly Activity[] = [
  {
    id: "crossfit",
    title: "CrossFit",
    summary:
      "Entrenamiento de alta intensidad con movimientos funcionales variados, que combina trabajo de fuerza y acondicionamiento.",
    focus: ["Alta intensidad", "Movimientos funcionales"],
    status: "confirmed",
  },
  {
    id: "funcional",
    title: "Funcional",
    summary:
      "Sesiones con movimientos globales y circuitos para trabajar fuerza, movilidad y resistencia general.",
    focus: ["Circuito", "Movilidad"],
    status: "confirmed",
  },
  {
    id: "power-gap",
    title: "Power Gap",
    summary:
      "Programa propio de NUWA. El nivel requerido, la intensidad y los horarios se consultan por WhatsApp.",
    focus: ["Programa NUWA"],
    status: "confirmed",
  },
  {
    id: "hybrid",
    title: "Hybrid",
    summary: "Clases que combinan trabajo de fuerza y acondicionamiento en una misma sesión.",
    focus: ["Fuerza + cardio"],
    status: "confirmed",
  },
  {
    id: "gap",
    title: "Gap",
    summary:
      "Programa propio de NUWA. El nivel requerido, la intensidad y los horarios se consultan por WhatsApp.",
    focus: ["Programa NUWA"],
    status: "confirmed",
  },
  {
    id: "upper-body",
    title: "Upper Body",
    summary: "Trabajo focalizado en tren superior. Consultá intensidad, días y horarios disponibles.",
    focus: ["Tren superior"],
    status: "confirmed",
  },
];

export const hasPendingActivities = activities.some((activity) => activity.status === "pending");

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Fotografías reales del box, recortadas del feed de NUWA y optimizadas.
 * TODO (cliente): reemplazarlas por los originales en alta resolución.
 */
export const gallery: readonly GalleryImage[] = [
  {
    src: "/images/box-01.jpg",
    alt: "Clase grupal de NUWA con barras en alto",
    width: 411,
    height: 546,
  },
  {
    src: "/images/box-02.jpg",
    alt: "Alumno sosteniendo una barra sobre la cabeza, visto desde arriba",
    width: 375,
    height: 549,
  },
  {
    src: "/images/box-03.jpg",
    alt: "Alumno haciendo flexiones sobre discos en el piso del box",
    width: 374,
    height: 548,
  },
];

export const pillars: readonly Pillar[] = [
  {
    title: "Constancia antes que intensidad",
    text: "Un plan que puedas sostener vale más que una semana perfecta. El foco está en volver, no en hacerlo todo de una vez.",
    icon: "repeat",
  },
  {
    title: "Técnica que te cuida",
    text: "Aprender a moverse bien es parte del entrenamiento. Menos atajos, más criterio en cada serie y en cada repetición.",
    icon: "target",
  },
  {
    title: "Comunidad real",
    text: "Entrenar acompañado cambia la experiencia. Un espacio para compartir objetivos con gente que también está construyendo su proceso.",
    icon: "users",
  },
];

export const steps: readonly Step[] = [
  {
    title: "Escribinos",
    text: "Contanos qué te interesa entrenar y en qué franja horaria te resulta posible.",
  },
  {
    title: "Coordinamos",
    text: "Te pasamos las actividades disponibles y los horarios confirmados del momento.",
  },
  {
    title: "Empezás",
    text: "Arrancás con una primera sesión y definís junto al equipo cómo seguir.",
  },
];

/** Honest framing used across sections: no medical claims, no promised results. */
export const disclaimer =
  "No prometemos resultados garantizados ni reemplazamos indicaciones médicas. Entrenar es un proceso: lo que sí ofrecemos es acompañamiento y constancia.";
