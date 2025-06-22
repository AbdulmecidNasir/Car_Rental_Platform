/**
 * Checks if two date ranges overlap
 * @param {Date} startDate1 - Start date of first range
 * @param {Date} endDate1 - End date of first range
 * @param {Date} startDate2 - Start date of second range
 * @param {Date} endDate2 - End date of second range
 * @returns {boolean} True if the date ranges overlap
 */
export function isDateRangeOverlapping(startDate1, endDate1, startDate2, endDate2) {
  // Check if one range ends before the other starts
  return !(endDate1 < startDate2 || startDate1 > endDate2);
}

/**
 * Formats a date object to YYYY-MM-DD string format (for input[type="date"])
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDateForInput(date) {
  const d = date instanceof Date ? date : new Date(date);
  
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

/**
 * Formats a date object to a localized string representation
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale to use for formatting (e.g., 'tr-TR')
 * @returns {string} Formatted date string
 */
export function formatDateToLocaleString(date, locale = 'tr-TR') {
  const d = date instanceof Date ? date : new Date(date);
  
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Adds a specified number of days to a date
 * @param {Date|string} date - Start date
 * @param {number} days - Number of days to add
 * @returns {Date} New date after adding days
 */
export function addDaysToDate(date, days) {
  const result = date instanceof Date ? new Date(date) : new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Gets today's date at midnight (00:00:00)
 * @returns {Date} Today's date with time set to midnight
 */
export function getTodayMidnight() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Checks if a date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if the date is in the past
 */
export function isDateInPast(date) {
  const checkDate = date instanceof Date ? date : new Date(date);
  checkDate.setHours(0, 0, 0, 0); // Set to midnight for proper comparison
  
  const today = getTodayMidnight();
  return checkDate < today;
}

/**
 * Calculates the difference in days between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Number of days between the dates (positive if date2 > date1)
 */
export function getDaysBetweenDates(date1, date2) {
  const d1 = date1 instanceof Date ? date1 : new Date(date1);
  const d2 = date2 instanceof Date ? date2 : new Date(date2);
  
  // Set both dates to midnight for accurate day calculation
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  
  // Calculate the difference in milliseconds and convert to days
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}