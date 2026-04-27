const DATE_LOCALE = 'en-GB';
const DATE_TIME_ZONE = 'Asia/Ho_Chi_Minh';

const dateFormatter = new Intl.DateTimeFormat(DATE_LOCALE, {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  timeZone: DATE_TIME_ZONE,
});

export function formatDateForUi(
  value: string | Date | null | undefined
): string {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return dateFormatter.format(date);
}
