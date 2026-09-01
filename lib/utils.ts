export function isPastDateTime(
  date: string,
  time: string
): boolean {
  const requested = new Date(
    `${date}T${time}`
  );

  return requested.getTime() < Date.now();
}