export {};

declare global {
  interface Window {
    VITE_APP_CONFIG?: Record<string, any>;
  }
}
