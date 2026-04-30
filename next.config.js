const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@mui/material',
      'lucide-react',
      '@tabler/icons-react',
      'framer-motion',
      'react-icons',
      '@radix-ui/react-icons',
      '@react-three/fiber',
      '@react-three/drei'
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "models.readyplayer.me",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "media.steampowered.com",
      },
    ],
  },
  transpilePackages: ["swiper"],
};

module.exports = withBundleAnalyzer(nextConfig);
