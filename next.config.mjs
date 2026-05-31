import { withPayload } from "@payloadcms/next/withPayload";

const remotePatterns = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
  {
    protocol: "https",
    hostname: "www.figma.com",
  },
  {
    protocol: "https",
    hostname: "s3-alpha-sig.figma.com",
  },
];

const nextConfig = {
  images: {
    remotePatterns,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default withPayload(nextConfig);
