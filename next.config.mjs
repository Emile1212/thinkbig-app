/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export 100% statique -> génère un dossier "out/" à uploader sur n'importe
  // quel hébergement (Hostinger partagé inclus). `next build` suffit.
  output: 'export',
  // Obligatoire en export statique : pas de serveur d'optimisation d'images.
  images: { unoptimized: true },
};

export default nextConfig;
