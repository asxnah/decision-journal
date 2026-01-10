export const formatDate = (isoDate: string) => {
  if (!isoDate) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
};
