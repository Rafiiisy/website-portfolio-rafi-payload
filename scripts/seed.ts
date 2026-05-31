import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import config from "@payload-config";
import { getPayload } from "payload";

import {
  buildHomepageLayout,
  SEED_FOOTER,
  SEED_HEADER,
  SEED_HOMEPAGE_META,
  SEED_SETTINGS,
} from "./seed-data";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "public", "assets");

const HERO_FILENAME = "hero-portrait.jpg";

async function ensureHeroMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: HERO_FILENAME } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    return existing.docs[0].id as string;
  }

  const filePath = path.join(assetsDir, HERO_FILENAME);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing asset: ${filePath}`);
  }

  const data = fs.readFileSync(filePath);
  const created = await payload.create({
    collection: "media",
    overrideAccess: true,
    file: {
      data,
      mimetype: "image/jpeg",
      name: HERO_FILENAME,
      size: data.length,
    },
    data: { alt: "Rafi Syafrinaldi — AI Specialist" },
  });

  return created.id as string;
}

async function ensureAdminUser(payload: Awaited<ReturnType<typeof getPayload>>) {
  const email = "admin@rafisyafrinaldi.com";
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs[0]) return;

  await payload.create({
    collection: "users",
    overrideAccess: true,
    data: {
      email,
      password: "admin123",
      roles: ["admin"],
    },
  });
}

async function upsertHomepage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  layout: ReturnType<typeof buildHomepageLayout>,
) {
  const data = {
    title: "Home",
    slug: "home",
    isHomepage: true,
    _status: "published" as const,
    publishedAt: new Date().toISOString(),
    meta: SEED_HOMEPAGE_META,
    layout,
  };

  const existing = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: "pages",
      id: existing.docs[0].id,
      data: data as never,
      draft: false,
      overrideAccess: true,
    });
    return;
  }

  await payload.create({
    collection: "pages",
    overrideAccess: true,
    data: data as never,
  });
}

async function seed() {
  const payload = await getPayload({ config });
  const portraitId = await ensureHeroMedia(payload);

  await ensureAdminUser(payload);

  await payload.updateGlobal({
    slug: "settings",
    overrideAccess: true,
    data: SEED_SETTINGS,
  });

  await payload.updateGlobal({
    slug: "header",
    overrideAccess: true,
    data: {
      ...SEED_HEADER,
      nav: [...SEED_HEADER.nav],
    },
  });

  await payload.updateGlobal({
    slug: "footer",
    overrideAccess: true,
    data: SEED_FOOTER,
  });

  await upsertHomepage(payload, buildHomepageLayout(portraitId));

  payload.logger.info("Portfolio Rafi seed completed.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
