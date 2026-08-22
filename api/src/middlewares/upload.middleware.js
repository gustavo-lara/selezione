import multer from 'multer';

import os from 'os';
import path from 'path';

// Armazena arquivos temporariamente no disco para não estourar a memória RAM com vídeos/arquivos grandes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic',
    'video/mp4', 'video/webm', 'video/quicktime'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo inválido. Envie imagens (JPEG, PNG, WEBP) ou vídeos (MP4, WEBM).'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter
  // limits: fileSize removido para upload ilimitado
});
