import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "@/collections/media";
import { Pages } from "@/collections/pages";
import { Users } from "@/collections/users";
import { Footer } from "@/globals/footer";
import { Header } from "@/globals/header";
import { Settings } from "@/globals/settings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function resolveSiteURL(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN?.trim();
  if (railwayDomain) {
    const withProtocol = railwayDomain.startsWith("http")
      ? railwayDomain
      : `https://${railwayDomain}`;
    return withProtocol.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

function trustedOrigins(siteURL: string): string[] {
  const origins = new Set<string>([siteURL]);

  for (const origin of (process.env.PAYLOAD_CORS_ORIGINS || "").split(",")) {
    const trimmed = origin.trim().replace(/\/$/, "");
    if (trimmed) {
      origins.add(trimmed);
    }
  }

  return [...origins];
}

const siteURL = resolveSiteURL();

export default buildConfig({
  serverURL: siteURL,
  cors: trustedOrigins(siteURL),
  csrf: trustedOrigins(siteURL),
  admin: {
    avatar: "default",
    importMap: {
      autoGenerate: true,
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Pages, Media, Users],
  globals: [Settings, Header, Footer],
  endpoints: [
    {
      method: "get",
      path: "/healthcheck",
      handler: () => Response.json("OK"),
    },
  ],
  editor: lexicalEditor({ features: [] }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    autoGenerate: true,
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
});
