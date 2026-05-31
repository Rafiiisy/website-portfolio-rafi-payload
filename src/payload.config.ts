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

export default buildConfig({
  serverURL: process.env.SITE_URL,
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
