
let env: Record<string, any> = {};

if (global.process) {
  env = global.process.env;
}

export default {
  apiBase: env.BACKEND_URL ? `${env.BACKEND_URL}/api` : "http://127.0.0.1:8000/api",
}