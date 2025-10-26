import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: [
      "federalnewsnetwork.com",
      "via.placeholder.com",
      "cdn.cnn.com",
      "static01.nyt.com",
      "images.unsplash.com",
      "content.api.newsapi.org", // sometimes NewsAPI uses this
      "media.newyorker.com",
      "ichef.bbci.co.uk",
      "s.yimg.com",
      "pbs.twimg.com",
      // add any other domains your news API returns
    ],
  },
};

export default nextConfig;
