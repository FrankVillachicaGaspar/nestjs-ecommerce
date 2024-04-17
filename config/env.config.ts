export const EnvConfiguration = () => ({
  environment: process.env.ENVIRONMENT,
  tursoDatabaseUrl: process.env.TURSO_DATABASE_URL,
  tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
});
