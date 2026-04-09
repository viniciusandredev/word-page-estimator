export function countWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .length;
}