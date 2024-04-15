export const EnvConfiguration = () => ({
  environment: process.env.ENVIRONMENT,
  tursoDatabaseUrl: process.env.TURSO_DATABASE_URL,
  tursoDatabaseToken: process.env.TURSO_DATABASE_TOKEN,
});
