const env = process.env;

export default {
  platformInternalApiUrl: env.platformInternalApiUrl || '',
  platformPublicApiUrl: env.platformPublicApiUrl || '',
  autumnAppId: env.autumnAppId || '',
  developerEnterpriseCode: env.developerEnterpriseCode || '',
  developerUserName: env.developerUserName || '',
  developerPassword: env.developerPassword || '',
};
