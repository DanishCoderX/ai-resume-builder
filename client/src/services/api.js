import axios from 'axios';

const api = axios.create({
  baseURL: 'ai-resume-builder-production-1c7d.up.railway.app',
});

export default api;
