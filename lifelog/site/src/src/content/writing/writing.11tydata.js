const { makeComputedData } = require("../../../lib/catalog");

module.exports = {
  layout: "writing-detail.njk",
  tags: ["writing"],
  eleventyComputed: makeComputedData("writing"),
};
