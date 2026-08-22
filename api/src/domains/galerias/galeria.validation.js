import { z } from 'zod';

export const createGaleriaSchema = z.object({
  nome: z.string({ required_error: 'O nome do ensaio/galeria é obrigatório' })
    .min(3, 'O nome da galeria deve ter no mínimo 3 caracteres')
    .max(100, 'O nome da galeria deve ter no máximo 100 caracteres')
    .trim(),
  tamanho_alocado_bytes: z.number({ required_error: 'O tamanho alocado é obrigatório' })
    .int()
    .min(0, 'O tamanho alocado não pode ser negativo')
});

export const updateGaleriaSchema = z.object({
  tamanho_alocado_bytes: z.number({ required_error: 'O tamanho alocado é obrigatório' })
    .int()
    .min(0, 'O tamanho alocado não pode ser negativo')
});

export const updateGaleriaStatusSchema = z.object({
  isActive: z.boolean({ required_error: 'O status de visibilidade é obrigatório' })
});

export const updateGaleriaPasswordSchema = z.object({
  password: z.string().optional()
});

export const clientAuthSchema = z.object({
  password: z.string({ required_error: 'A senha é obrigatória' }).min(1, 'A senha não pode estar vazia')
});
