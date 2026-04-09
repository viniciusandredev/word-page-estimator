import { formats } from "../config/formats.js";

export function estimatePages(wordCount) {

  return formats.map(format => {

    const pages = Math.ceil(
      wordCount / format.wordsPerPage
    );

    return {
      format: format.name,
      pages
    };

  });

}