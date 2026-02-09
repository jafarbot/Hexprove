/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Avoid ESLint 9 vs Next.js option mismatch during build; run `npm run lint` locally
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // Brand misspelling redirects - capture common search variations
      {
        source: '/hex-proof',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hexproof',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hex-prove',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hexpoof',
        destination: '/',
        permanent: true,
      },
      // Section shortcuts — redirect to parent pages
      {
        source: '/team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/experience',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/engagement',
        destination: '/how-we-work',
        permanent: true,
      },
      {
        source: '/service',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
