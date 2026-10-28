/// <reference types="astro/client" />

/**
 * Public environment variables (exposed to the browser, never put secrets here).
 * All of them are optional: empty values fall back to explicit placeholders.
 */
interface ImportMetaEnv {
  readonly PUBLIC_WHATSAPP_NUMBER?: string;
  readonly PUBLIC_WHATSAPP_MESSAGE?: string;
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_INSTAGRAM_HANDLE?: string;
  readonly PUBLIC_GYM_ADDRESS?: string;
  readonly PUBLIC_MAPS_URL?: string;
  readonly PUBLIC_SITE_URL?: string;
}
