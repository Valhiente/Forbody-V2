/** @type {import('next').NextConfig} */
const nextConfig = {
  // O GitHub Pages não suporta otimização de imagem nativa do servidor Next.js
  images: {
    unoptimized: true,
  },

  // IMPORTANTE: Se o seu repositório se chamar "Forbody-V2" e não "seu-usuario.github.io",
  // você precisará descomentar a linha abaixo e colocar o nome exato do seu repositório.
  // basePath: '/Forbody-V2',
  
  reactStrictMode: true,
};

module.exports = nextConfig;