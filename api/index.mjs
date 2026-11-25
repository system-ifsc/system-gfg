import { createApp } from '../server.mjs';

// Reutiliza o mesmo tratamento de requisições do servidor local na Vercel.
const app = createApp();
export default function handler(req, res) {
  app.emit('request', req, res);
}
