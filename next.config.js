/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.paypal.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://images.unsplash.com https://logo.clearbit.com; font-src 'self' data:; connect-src 'self' https://api-m.paypal.com https://api-m.sandbox.paypal.com; object-src 'none'; base-uri 'self'; form-action 'self' https://www.paypal.com; frame-ancestors 'none'; frame-src 'self' https://www.paypal.com; upgrade-insecure-requests;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
