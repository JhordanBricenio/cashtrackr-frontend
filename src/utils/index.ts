export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-ES", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
}
