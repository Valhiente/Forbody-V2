'use client';

import { useEffect } from 'react';

const MAX_FILE_SIZE_MB = 10;
const MAX_TOTAL_UPLOAD_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_TOTAL_UPLOAD_BYTES = MAX_TOTAL_UPLOAD_MB * 1024 * 1024;

function formatMb(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')}MB`;
}

export function MarketingUploadGuard() {
  useEffect(() => {
    const marketingForm = document.querySelector<HTMLFormElement>('[data-marketing-form="true"]');

    if (!marketingForm) {
      return;
    }

    const form = marketingForm;

    function handleSubmit(event: SubmitEvent) {
      const fileInputs = Array.from(
        form.querySelectorAll<HTMLInputElement>('input[type="file"]')
      );

      const selectedFiles = fileInputs.flatMap((input) => Array.from(input.files ?? []));
      const oversizedFile = selectedFiles.find((file) => file.size > MAX_FILE_SIZE_BYTES);
      const totalUploadSize = selectedFiles.reduce((total, file) => total + file.size, 0);

      if (oversizedFile) {
        event.preventDefault();
        alert(
          `A imagem "${oversizedFile.name}" tem ${formatMb(oversizedFile.size)} e ultrapassa o limite de ${MAX_FILE_SIZE_MB}MB por imagem.\n\nComo corrigir:\n1. Baixe a arte do Canva em JPG ou WebP.\n2. Comprima a imagem antes de enviar.\n3. Tente deixar cada imagem entre 300KB e 2MB para a Home carregar rápido.`
        );
        return;
      }

      if (totalUploadSize > MAX_TOTAL_UPLOAD_BYTES) {
        event.preventDefault();
        alert(
          `As imagens selecionadas somam ${formatMb(totalUploadSize)}. O limite seguro por salvamento é ${MAX_TOTAL_UPLOAD_MB}MB.\n\nComo corrigir:\n1. Salve primeiro o banner e os textos.\n2. Depois salve o carrossel em partes.\n3. Se possível, use WebP/JPG comprimido.\n\nImportante: cada imagem pode ter até ${MAX_FILE_SIZE_MB}MB, mas o envio total também precisa ficar abaixo de ${MAX_TOTAL_UPLOAD_MB}MB.`
        );
      }
    }

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return null;
}
