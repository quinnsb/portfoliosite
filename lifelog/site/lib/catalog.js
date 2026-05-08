const path = require("path");

const CATALOG_PATTERN = /^(RNK|WRT|PRJ)-(\d{4})-(.+)$/;

const TYPE_MAP = {
  RNK: { label: "Rankings", dir: "rankings", jp: "順位" },
  WRT: { label: "Writing", dir: "writing", jp: "執筆" },
  PRJ: { label: "Projects", dir: "projects", jp: "企画" },
};

function parseCatalogId(inputPath) {
  const stem = path.basename(inputPath, path.extname(inputPath));
  const match = stem.match(CATALOG_PATTERN);
  if (!match) return null;
  return {
    prefix: match[1],
    number: parseInt(match[2], 10),
    paddedNumber: match[2],
    slug: match[3],
    id: `${match[1]}-${match[2]}`,
  };
}

function makeComputedData(typeDir) {
  return {
    catalogId: (data) => parseCatalogId(data.page.inputPath),
    eleventyExcludeFromCollections: (data) => data.published === false,
    permalink: (data) => {
      if (data.published === false) return false;
      const catalog = parseCatalogId(data.page.inputPath);
      if (!catalog) return false;
      return `/${typeDir}/${catalog.id.toLowerCase()}/`;
    },
  };
}

function validateCatalogIds(items, typePrefix) {
  const ids = new Map();
  let hasError = false;

  for (const item of items) {
    if (!item.data.catalogId) continue;
    const id = item.data.catalogId.id;
    if (ids.has(id)) {
      console.error(
        `\x1b[31m[CATALOG ERROR] Duplicate ID "${id}" found in:\n` +
          `  - ${ids.get(id).inputPath}\n` +
          `  - ${item.inputPath}\x1b[0m`
      );
      hasError = true;
    }
    ids.set(id, item);
  }

  if (hasError) {
    throw new Error(
      `Build aborted: duplicate catalog IDs found in ${typePrefix} entries.`
    );
  }

  const numbers = [...ids.values()]
    .map((item) => item.data.catalogId.number)
    .sort((a, b) => a - b);

  for (let i = 1; i < numbers.length; i++) {
    const expected = numbers[i - 1] + 1;
    if (numbers[i] !== expected) {
      const missing = [];
      for (let n = expected; n < numbers[i]; n++) {
        missing.push(`${typePrefix}-${String(n).padStart(4, "0")}`);
      }
      console.warn(
        `\x1b[33m[CATALOG WARNING] Gap in ${typePrefix} sequence: missing ${missing.join(", ")}\x1b[0m`
      );
    }
  }
}

module.exports = { parseCatalogId, makeComputedData, validateCatalogIds, TYPE_MAP };
