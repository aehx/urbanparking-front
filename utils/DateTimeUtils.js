/**
 * Convert a Date object to its string representation
 *
 * @param date Date object
 * @return string Representative string of the date passed
 */
export function stringify(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthFormat = month < 10 ? "0" + (month + 1) : month + 1;
  const day = date.getDate();

  return `${day}/${monthFormat}/${year}`;
}
