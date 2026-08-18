import { http } from './http.js';

export const toggleSelection = (fotoId) =>
  http.post(`/api/fotos/${fotoId}/selecao`);

export const listGallerySelections = (galeriaId) =>
  http.get(`/api/galerias/${galeriaId}/selecoes`);
