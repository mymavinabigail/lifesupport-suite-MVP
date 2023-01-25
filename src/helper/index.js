export function getSortDirection(arr) {
  const c = [];
  for (let i = 1; i < arr.length; i++) {
    c.push(arr[i - 1].localeCompare(arr[i]));
  }

  if (c.every((n) => n <= 0)) return "ascending";
  if (c.every((n) => n >= 0)) return "descending";

  return "unsorted";
}
