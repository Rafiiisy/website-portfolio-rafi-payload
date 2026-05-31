#!/usr/bin/env node
import { readdir, readFile, access } from "fs/promises";
import path from "path";

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function validatePage(doc, filePath) {
  const errors = [];
  if (!doc || typeof doc !== "object") {
    return [`${filePath}: document must be an object`];
  }
  if (!doc.id || typeof doc.id !== "string") errors.push("missing string id");
  if (!doc.title || typeof doc.title !== "string") errors.push("missing string title");
  if (!doc.slug || typeof doc.slug !== "string") errors.push("missing string slug");
  if (!doc.seo || typeof doc.seo !== "object") {
    errors.push("missing seo object");
  } else {
    if (!doc.seo.title || typeof doc.seo.title !== "string") errors.push("missing seo.title");
    if (!doc.seo.description || typeof doc.seo.description !== "string") {
      errors.push("missing seo.description");
    }
  }
  if (!Array.isArray(doc.sections)) {
    errors.push("sections must be an array");
  } else {
    doc.sections.forEach((section, index) => {
      if (!section || typeof section !== "object") {
        errors.push(`sections[${index}] must be an object`);
        return;
      }
      if (!section.id || typeof section.id !== "string") errors.push(`sections[${index}].id missing`);
      if (!section.type || typeof section.type !== "string") errors.push(`sections[${index}].type missing`);
      if (!section.props || typeof section.props !== "object") {
        errors.push(`sections[${index}].props missing object`);
      }
    });
  }
  return errors.map((err) => `${filePath}: ${err}`);
}

function validateSite(doc, filePath) {
  const errors = [];
  if (!doc || typeof doc !== "object") return [`${filePath}: document must be an object`];
  if (!doc.brand || typeof doc.brand !== "string") errors.push("missing brand");
  if (!Array.isArray(doc.nav)) errors.push("nav must be an array");
  if (!doc.footer || typeof doc.footer !== "object") {
    errors.push("missing footer object");
  } else if (!doc.footer.text || typeof doc.footer.text !== "string") {
    errors.push("missing footer.text");
  }
  return errors.map((err) => `${filePath}: ${err}`);
}

async function main() {
  const root = process.cwd();
  const pagesDir = path.resolve(root, "content", "pages");
  const siteFile = path.resolve(root, "content", "site", "site.json");
  const allErrors = [];

  if (!(await exists(pagesDir))) {
    allErrors.push(`Missing pages directory: ${pagesDir}`);
  } else {
    const entries = await readdir(pagesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
      const filePath = path.join(pagesDir, entry.name);
      const parsed = JSON.parse(await readFile(filePath, "utf8"));
      allErrors.push(...validatePage(parsed, filePath));
    }
  }

  if (!(await exists(siteFile))) {
    allErrors.push(`Missing site file: ${siteFile}`);
  } else {
    const site = JSON.parse(await readFile(siteFile, "utf8"));
    allErrors.push(...validateSite(site, siteFile));
  }

  if (allErrors.length > 0) {
    console.error("Content validation failed:");
    allErrors.forEach((line) => console.error(`- ${line}`));
    process.exit(1);
  }

  console.log("Content validation passed.");
}

main().catch((error) => {
  console.error("Validation failed due to runtime error:", error);
  process.exit(1);
});
