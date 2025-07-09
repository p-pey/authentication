import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  sassOptions: {
    additionalData: `@import "./src/styles/variables.scss";`,
    implementation: 'sass-embedded',
  }
};

export default nextConfig;
