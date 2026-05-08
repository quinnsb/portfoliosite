const path = require("path");
const Image = require("@11ty/eleventy-img");
const { parseCatalogId, validateCatalogIds, TYPE_MAP } = require("./lib/catalog");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/images");

  // RSS helpers (avoiding ESM plugin compatibility issues)
  eleventyConfig.addFilter("dateToRfc3339", function (date) {
    if (!date) return "";
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("newestDate", function (collection) {
    if (!collection || !collection.length) return new Date().toISOString();
    let newest = new Date(0);
    for (const item of collection) {
      const d = new Date(item.data.date || item.data.date_updated || 0);
      if (d > newest) newest = d;
    }
    return newest.toISOString();
  });

  eleventyConfig.addFilter("xmlEscape", function (str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  });

  eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
    let inputPath;
    if (src.startsWith("/") || src.startsWith("http")) {
      inputPath = src.startsWith("/") ? path.join("src", src) : src;
    } else {
      inputPath = path.join(path.dirname(this.page.inputPath), src);
    }

    const metadata = await Image(inputPath, {
      widths: [400, 800, 1200],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./_site/img/",
      urlPath: "/img/",
      filenameFormat: function (id, src, width, format) {
        const name = path.basename(src, path.extname(src));
        return `${name}-${width}w.${format}`;
      },
    });

    return Image.generateHTML(metadata, {
      alt: alt || "",
      sizes: sizes || "(min-width: 768px) 720px, 100vw",
      loading: "lazy",
      decoding: "async",
    });
  });

  eleventyConfig.addGlobalData("site", {
    title: "Brewer Research & Design",
    description: "A personal archive of rankings, writing, and projects.",
    url: "https://archive.quinnbrewer.com",
  });

  eleventyConfig.addFilter("excerpt", function (content) {
    if (!content) return "";
    const stripped = content.replace(/<[^>]+>/g, "");
    const firstPara = stripped.trim().split(/\n\s*\n/)[0];
    if (!firstPara) return "";
    const maxLen = 180;
    if (firstPara.length <= maxLen) return firstPara.trim();
    return firstPara.substring(0, maxLen).replace(/\s+\S*$/, "") + "…";
  });

  eleventyConfig.addFilter("dateFormat", function (date) {
    if (!date) return "";
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
  });

  function makeCollection(collectionApi, typePrefix) {
    const typeInfo = TYPE_MAP[typePrefix];
    const glob = `src/content/${typeInfo.dir}/*.md`;
    const all = collectionApi.getFilteredByGlob(glob);

    validateCatalogIds(all, typePrefix);

    const published = all.filter((item) => item.data.published !== false);
    published.sort((a, b) => {
      const aNum = a.data.catalogId ? a.data.catalogId.number : 0;
      const bNum = b.data.catalogId ? b.data.catalogId.number : 0;
      return bNum - aNum;
    });

    return published;
  }

  eleventyConfig.addCollection("rankings", (api) => makeCollection(api, "RNK"));
  eleventyConfig.addCollection("writing", (api) => makeCollection(api, "WRT"));
  eleventyConfig.addCollection("projects", (api) => makeCollection(api, "PRJ"));

  eleventyConfig.addCollection("allEntries", (api) => {
    const all = [
      ...api.getFilteredByGlob("src/content/rankings/*.md"),
      ...api.getFilteredByGlob("src/content/writing/*.md"),
      ...api.getFilteredByGlob("src/content/projects/*.md"),
    ];

    return all
      .filter((item) => item.data.published !== false)
      .sort((a, b) => new Date(b.data.date || b.data.date_updated || 0) - new Date(a.data.date || a.data.date_updated || 0));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
