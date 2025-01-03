const journalTime = (date) => {
  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

   // Determine AM or PM
   const ampm = hours >= 12 ? 'PM' : 'AM';

   // Convert to 12-hour format
   hours = hours % 12;
   hours = hours ? hours : 12; // 0 becomes 12 for midnight

   // Format hours and minutes to have leading zeros if needed
   const formattedHours = hours.toString().padStart(2, '0');
   const formattedMinutes = minutes.toString().padStart(2, '0');

   // Return the formatted time
   return `${formattedHours}:${formattedMinutes} ${ampm}`;
}


export default journalTime;