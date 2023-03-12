
let env: Record<string, any> = {};

if (global.process) {
  env = global.process.env;
}

export default {
  apiBase: env.API_BASE || "http://127.0.0.1:8000/api",
}