const config = {
    apiUrl: import.meta.env.VITE_API_URL,
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
};

export default config;
