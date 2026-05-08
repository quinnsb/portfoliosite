const { makeComputedData } = require("../../../lib/catalog");

module.exports = {
  layout: "project-detail.njk",
  tags: ["projects"],
  eleventyComputed: makeComputedData("projects"),
};
