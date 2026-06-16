/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Next.js standard (serveur Node) -> déployable depuis GitHub sur tout
  // hôte Node : Vercel, Render, Railway, Hostinger (plan Node.js / VPS).
  // Build : `npm run build`  ·  Démarrage : `npm start` (écoute $PORT).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
