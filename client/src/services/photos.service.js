import { http } from './http.js';

export const uploadPhotos = (galeriaId, formData) =>
  http.post(`/api/galerias/${galeriaId}/fotos`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const listGalleryPhotos = (galeriaId) =>
  http.get(`/api/galerias/${galeriaId}/fotos`);

export const listPublicPhotos = (slug) =>
  http.get(`/api/public/${slug}/fotos`);

export const deletePhoto = (fotoId) =>
  http.delete(`/api/fotos/${fotoId}`);
