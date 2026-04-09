import fs from "fs";

export function parseTxt(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}