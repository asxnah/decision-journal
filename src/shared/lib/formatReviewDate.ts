import { formatDate } from "@lib/formatDate";

export const formatReviewDate = (isoDate: string) => {
  if (!isoDate) return "-";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(`${isoDate}T00:00:00`);

  const diffMs = target.getTime() - today.getTime();
  const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (totalDays === 0) {
    return "Today";
  }

  if (totalDays < 0) {
    return formatDate(isoDate);
  }

  if (totalDays <= 30) {
    return totalDays === 1 ? "In 1 day" : `In ${totalDays} days`;
  }

  let months =
    target.getFullYear() * 12 +
    target.getMonth() -
    (today.getFullYear() * 12 + today.getMonth());

  const monthAnchor = new Date(today);
  monthAnchor.setMonth(today.getMonth() + months);

  if (monthAnchor > target) {
    months--;
    monthAnchor.setMonth(monthAnchor.getMonth() - 1);
  }

  const remainingDays = Math.ceil(
    (target.getTime() - monthAnchor.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (months < 12) {
    const monthPart = months === 1 ? "1 month" : `${months} months`;

    if (remainingDays <= 0) {
      return `In ${monthPart}`;
    }

    const dayPart = remainingDays === 1 ? "1 day" : `${remainingDays} days`;

    return `In ${monthPart} ${dayPart}`;
  }

  const years = Math.floor(months / 12);

  if (years === 1) {
    return "In one year";
  }

  return `In more than ${years} years`;
};

export const isTodayOrPast = (isoDate: string) => {
  if (!isoDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(`${isoDate}T00:00:00`);

  return target.getTime() <= today.getTime();
};
