export const buildLocalDateByUnixTimestamp = (
  unixTimestamp: number
): string => {
  /* Unix timestamp comes as a number of seconds.
   * Date() receives a number of milliseconds
   */
  const date = new Date(unixTimestamp * 1000);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#to_get_date_month_and_year_or_time
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  return `${day}/${month}/${year}`;
};
