import { useState, useEffect } from 'react';
import journalDate from '../../../functions/journalDate.js';
import journalTime from '../../../functions/journalTime.js';
import getMoodPicture from '../../../functions/getMoodPicture.js';

const Journal = ({journal}) => {
    const [stringDate, setStringDate] = useState('');
    const [logicalDate, setLogicalDate] = useState('');
    const [stringTime, setStringTime] = useState('');
    const [logicalTime, setLogicalTime] = useState('');
    const [moodPicture, setMoodPicture] = useState('https://via.placholder.com/150');

    useEffect(() => {
      const handleDateAndTime = () => {
        const date = new Date(journal.createdAt.toDate());
        const rawTime = journalTime(date)
         .split(' ')[0]
         .split(':')
         .join('-');

        setStringDate(journalDate(date).stringDate);
        setLogicalDate(journalDate(date).logicalDate);

        setStringTime(journalTime(date));
        setLogicalTime(rawTime);
      }
      handleDateAndTime();


      const handleMoodPicture = () => {
        const pictureUrl = getMoodPicture(journal.journalMood);
        setMoodPicture(pictureUrl);
      }
      handleMoodPicture();
    }, []);


    return (
        <div className="journal">
            <time dateTime={logicalDate}> { stringDate } </time>
            <div className="journal-content">
                <div>
                  <time dateTime={`${logicalDate}T${logicalTime}`}> {stringTime} </time>
                  <h3> {journal.journalTitle} </h3>
                  <p> {journal.journalContent} </p>
                </div>
                
                <div className="journal-image">
                    <img src={moodPicture} alt={journal.journalMood} />
                </div>
            </div>
        </div>
    );
}
export default Journal;
