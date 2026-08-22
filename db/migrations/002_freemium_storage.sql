-- Adiciona coluna de plano e armazenamento nas contas de fotógrafos
ALTER TABLE fotografos
ADD COLUMN IF NOT EXISTS plano VARCHAR(50) DEFAULT 'FREE',
ADD COLUMN IF NOT EXISTS armazenamento_total_bytes BIGINT DEFAULT 3221225472; -- 3GB default

-- Adiciona coluna de cota alocada por galeria
ALTER TABLE galerias
ADD COLUMN IF NOT EXISTS tamanho_alocado_bytes BIGINT DEFAULT 0;

-- Adiciona tamanho individual de cada arquivo de foto
ALTER TABLE fotos
ADD COLUMN IF NOT EXISTS tamanho_arquivo_bytes BIGINT DEFAULT 0;
