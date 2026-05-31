#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STRAPI_URL = (process.env.STRAPI_URL || "").replace(/\/$/, "");
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

if (!STRAPI_URL) {
  console.error("Missing STRAPI_URL");
  process.exit(1);
}

const SECTION_TYPE_TO_UID = {
  hero: "sections.hero",
  landing: "sections.landing",
  "booking-form": "sections.booking-form",
};

function authHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }
  return headers;
}

function mapSectionToStrapi(section) {
  const source = section && typeof section === "object" ? section : {};
  const props = source.props && typeof source.props === "object" ? source.props : {};
  return {
    __component: SECTION_TYPE_TO_UID[source.type] || source.type,
    ...props,
  };
}

function toStrapiPagePayload(appPage) {
  const sections = Array.isArray(appPage?.sections) ? appPage.sections : [];
  return {
    title: appPage.title,
    slug: appPage.slug,
    seo: appPage.seo || {},
    sections: sections.map(mapSectionToStrapi),
  };
}

async function findExistingPageIdBySlug(slug) {
  const query = new URLSearchParams({
    "filters[slug][$eq]": slug,
  });
  const response = await fetch(`${STRAPI_URL}/api/pages?${query.toString()}`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`List failed ${response.status}: ${body}`);
  }
  const payload = await response.json();
  const first = payload?.data?.[0];
  if (!first) return null;
  return first.documentId || first.id;
}

async function upsertPage(appPage) {
  const existingId = await findExistingPageIdBySlug(appPage.slug);
  const payload = { data: toStrapiPagePayload(appPage) };

  if (existingId) {
    const response = await fetch(`${STRAPI_URL}/api/pages/${existingId}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`PUT failed ${response.status}: ${body}`);
    }
    return { mode: "updated", slug: appPage.slug };
  }

  const response = await fetch(`${STRAPI_URL}/api/pages`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`POST failed ${response.status}: ${body}`);
  }
  return { mode: "created", slug: appPage.slug };
}

async function main() {
  const seedsDir = path.resolve(__dirname, "../../exports/strapi/pages");
  const names = await readdir(seedsDir);
  const jsonFiles = names.filter((name) => name.endsWith(".json")).sort();
  if (!jsonFiles.length) {
    throw new Error(`No seed JSON files found in ${seedsDir}`);
  }

  for (const fileName of jsonFiles) {
    const raw = await readFile(path.join(seedsDir, fileName), "utf8");
    const appPage = JSON.parse(raw);
    const result = await upsertPage(appPage);
    console.log(`${result.mode}\t${result.slug}\t(${fileName})`);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
