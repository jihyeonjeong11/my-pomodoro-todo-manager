/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Only SVG files
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(mp3|wav)$/, // Handle MP3 and WAV files
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]", // Customize the output filename format for audio files
            outputPath: "static/audio", // Output directory for audio files
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
