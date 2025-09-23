export const CONFIG = {
  // URL base per le API
  API_BASE_URL_DEV: "https://pc2.dev.schema31.it",
  API_BASE_URL_PROD: "https://pc2.protezionecivilecalabria.it",

  // Endpoint API
  ENDPOINTS: {
    LOGIN: "/api/users/_session",
    REGISTER: "/registra",
    VERIFY_EMAIL: "/api/email/verify",
    VERIFY_PHONE: "/api/cellular/verify",
    EVENTS_FIND: "/api/events/_find",
    EVENTS_CREATE: "/api/events",
    EVENTS_VIEW: "/api/events",
    EVENTS_UPDATE: "/api/events",
  },

  // Credenziali di test
  TEST_CREDENTIALS: {
    fiscalCode: "CPNGNN97R30H501J",
    password: "89411809",
  },

  // URL esterni
  EXTERNAL_URLS: {
    WEATHER_BULLETIN:
      "https://protezionecivilecalabria.it/bollettino-meteo/bollettino-meteo.php",
    REGION_WEBSITE: "https://www.regione.calabria.it",
    PRIVACY_POLICY: "https://protezionecivilecalabria.it/privacy",
    CONTACTS: "https://protezionecivilecalabria.it/contatti",
  },

  // Configurazione mappa
  MAP_CONFIG: {
    INITIAL_REGION: {
      latitude: 39.3081, // Centro Calabria
      longitude: 16.2539,
      latitudeDelta: 2.0,
      longitudeDelta: 2.0,
    },
  },

  // Ambiente corrente (dev/prod)
  ENVIRONMENT: __DEV__ ? "dev" : "prod",
};

// Funzione per ottenere l'URL base corretto
export const getBaseUrl = () => {
  return CONFIG.ENVIRONMENT === "dev"
    ? CONFIG.API_BASE_URL_DEV
    : CONFIG.API_BASE_URL_PROD;
};
