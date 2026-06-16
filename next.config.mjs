/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Hôtes autorisés pour next/image (affiche/arrière-plan de l'intro).
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

export default nextConfig;
