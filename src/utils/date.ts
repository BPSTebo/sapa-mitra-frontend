export const formatPeriodDate = (period: string): Date => {
  if (!period) return new Date();
  const parts = period.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;

  return new Date(year, month);
};

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const day = date.getUTCDate(); // Get day of the month (1-31)
  const month = date.toLocaleString("id-ID", { month: "long" }); // Get full month name
  const year = date.getUTCFullYear(); // Get full year (4 digits)

  return `${day} ${month} ${year}`;
};

export const formatDateOriginal = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const day = date.toLocaleString("id-ID", { day: "2-digit" });
  const month = date.toLocaleString("id-ID", { month: "2-digit" });
  const year = date.getUTCFullYear();

  return `${year}-${month}-${day} `;
};
export const generatePeriods = (
  startYear: number = 2025
): { value: string; text: string }[] => {
  const periods = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= startYear; year--) {
    for (let month = 12; month >= 1; month--) {
      const monthString = month.toString().padStart(2, "0");
      const period = `${year}-${monthString}`;
      periods.push({ value: period, text: period });
    }
  }
  return periods;
};

export const generateYear = (
  startYear: number = 2025
): { value: string; text: string }[] => {
  const periods = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= startYear; year--) {
    periods.push({ value: year.toString(), text: year.toString() });
  }

  return periods;
};
