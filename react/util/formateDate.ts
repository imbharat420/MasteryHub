const formatter = (long = false) => new Intl.DateTimeFormat('en-us', {
  year: 'numeric',
  month: long ? 'long' : 'short',
  day: 'numeric',
});

export const getDateParts = (date: string | Date, long = false): Omit<Record<Intl.DateTimeFormatPartTypes, string>, 'literal'> => {
  const d = new Date(date);
  const parts = formatter(long).formatToParts(d);
  const formatted = parts.filter(item => item.type !== 'literal').reduce((acc, curr) => ({ ...acc, [curr.type]: curr.value }), {});
  return formatted as Omit<Record<Intl.DateTimeFormatPartTypes, string>, 'literal'>;
};

export const formatDate = (date?: Date | string, long = false) => (!date ? '' : formatter(long).format(new Date(date)));

export default { formatDate, getDateParts };
