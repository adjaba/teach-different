export function cleanText(a) {
  return a.replace(/[^\w\s\d]/g, '');
}

export function alphabeticalOrder(a, b) {
  const cleanedA = cleanText(a.title);
  const cleanedB = cleanText(b.title);
  return cleanedA > cleanedB ? 1 : cleanedA < cleanedB ? -1 : 0;
}
