/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dhxummckajoranathmmy.supabase.co",
      "images.unsplash.com",
      "tailwindui.com",
      "production-next-images-cdn.thumbtack.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
