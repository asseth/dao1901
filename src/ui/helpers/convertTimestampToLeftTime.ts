/**
 * Convert a timestamp later in the future to the remaining time from now
 * @param timestamp
 * @returns {{days: number, hours: number, minutes: number}}
 */
export default function convertTimestampToLeftTime(timestamp) {
  let diff = timestamp - Math.floor(Date.now() / 1000);
  let days = Math.floor(diff / 86400);
  // Total hours - days in hours
  let hours = Math.floor(diff / 3600) - (days * 24);
  // Total minutes - days and hours in minutes
  let minutes = Math.floor(diff / 60) - ((days * 24 * 60) + (hours * 60));
  return {days, hours, minutes};
};