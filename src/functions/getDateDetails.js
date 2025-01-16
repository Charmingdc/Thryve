const getDateDetails = (date) => {
   // Day names array
   const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          
   // Month names array
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   // Get the day name
   const dayName = dayNames[date.getDay()]; // Get the day of the week (0-6)

   // Get the month name
   const monthName = monthNames[date.getMonth()]; // Get the month (0-11)

   // Get the current day of the month
   const day = date.getDate().toString().padStart(2, '0'); // Get the day of the month (1-31)

   // Get the year
   const year = date.getFullYear(); // Get the year

   // Return all values
   return {
     dayName: dayName,
     monthName: monthName,
     day: day,
     year: year
   }
};

export default getDateDetails;