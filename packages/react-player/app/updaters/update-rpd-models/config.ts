const env = process.env;

export default {
  rapidApiUrl: env.RAPID_API_URL || 'http://127.0.0.1:8000/api',
};
