import getDateDetails from './getDateDetails';

const journalDate = (date) => {
  const dateDetails = getDateDetails(date);

  const stringDate = `${dateDetails.monthName} ${dateDetails.day}, ${dateDetails.year} - ${dateDetails.dayName}.`;
  const logicalDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  return {
    stringDate,
    logicalDate,
  }
};


export default journalDate;