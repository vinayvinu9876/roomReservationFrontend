/* Given a start date, end date and day name, return
** an array of dates between the two dates for the
** given day inclusive
** @param {Date} start - date to start from
** @param {Date} end - date to end on
** @param {string} dayName - name of day
** @returns {Array} array of Dates
*/
function getDaysBetweenDates(start, end, dayName) {
    var result = [];
    var days = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
    var day = days[dayName.toLowerCase().substr(0,3)];
    // Copy start date
    var current = new Date(start);
    // Shift to next of required days
    current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
    // While less than end date, add dates to result array
    while (current < end) {
      result.push(new Date(+current));
      current.setDate(current.getDate() + 7);
    }
    return result;  
  }
  
  // Get Wednesdays between 15 December, 2016 and 25 February, 2017.
  /* TEST
  console.log(getDaysBetweenDates(
                new Date(2016,11,15),
                new Date(2017,1,25),
                'Mon'));
  */

export default getDaysBetweenDates;