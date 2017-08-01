/**
 * Convert timestamp to date
 * @param UNIX_timestamp
 * @returns {string}
 */
export default function convertTimestampToDate(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = `${date} ${month} ${year}`;
  return time;
}