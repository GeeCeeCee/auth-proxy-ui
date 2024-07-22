/** @type {import('next').NextConfig} */
import path from "path";
const __dirname = path.resolve();

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve.fallback = { fs: false };

    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader?.includes("css-loader") &&
          !moduleLoader.loader?.includes("postcss-loader") &&
          moduleLoader.options?.modules?.getLocalIdent != null
        ) {
          moduleLoader.options.modules.getLocalIdent = (
            _context,
            _localIdentName,
            exportName,
            _options,
            meta
          ) => exportName;
        }
      });
    });

    return config;
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
