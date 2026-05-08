const { makeComputedData } = require("../../../lib/catalog");

module.exports = {
  layout: "ranking-detail.njk",
  tags: ["rankings"],
  eleventyComputed: makeComputedData("rankings"),
};
