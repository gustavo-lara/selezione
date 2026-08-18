import { http } from './http.js';

export const createGallery = (nome) =>
  http.post('/api/galerias', { nome });

export const listMyGalleries = () =>
  http.get('/api/galerias');

export const deleteGallery = (id) =>
  http.delete(`/api/galerias/${id}`);

export const getPublicGallery = (slug) =>
  http.get(`/api/galerias/public/${slug}`);
