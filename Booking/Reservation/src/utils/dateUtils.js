// src/utils/dateUtils.js

/**
 * Formats a Date object into a 'YYYY-MM-DD' string.
 * @param {Date} date - The date object to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date) => date.toISOString().split('T')[0];

/**
 * Gets the number of days in a given month and year.
 * @param {number} year - The full year.
 * @param {number} month - The month (0-11).
 * @returns {number} The number of days in the month.
 */
export const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

/**
 * Gets the day of the week for the first day of the month.
 * @param {number} year - The full year.
 * @param {number} month - The month (0-11).
 * @returns {number} The day of the week (0=Sunday, 6=Saturday).
 */
export const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();