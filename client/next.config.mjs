/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
  webpack: (config, options) => {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: config.inlineImageLimit,
            fallback: "file-loader",
            publicPath: `${config.assetPrefix}/_next/static/sounds/`,
            outputPath: `${isServer ? "../" : ""}static/sounds/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
  // i18n: {
  //   locales: ['en', 'fr', 'es'], // Supported languages (add languages as needed)
  //   defaultLocale: 'en', // Default language
  // },
  // outputFileTracing: true, // Optimizes output for serverless
  // modularizeImports: {
  //     lodash: {
  //         transform: 'lodash/{{member}}', // Import only specific lodash modules to reduce bundle size
  //     },
  // },
  // productionBrowserSourceMaps: true, // Enables source maps for production (useful for debugging)
};

export default nextConfig;
