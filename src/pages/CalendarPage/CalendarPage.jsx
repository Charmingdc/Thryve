import "@fullcalendar/common/main.css"; // Core CSS
import dayGridPlugin from "@fullcalendar/daygrid"; // DayGrid view plugin
import interactionPlugin from "@fullcalendar/interaction"; // Interaction plugin (dragging, date click)
import FullCalendar from '@fullcalendar/react';
// import "@fullcalendar/timegrid/main.css";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import BottomNav from '../../components/Helpers/BottomNav';
import Loader from '../../components/Helpers/Loader';
import SideBar from '../../components/Helpers/SideBar';
import Topnavbar from '../../components/Helpers/Topnavbar';
import { auth, db } from '../../firebase/firebase-init';
import './Style.css';


const CalendarPage = () => {
  const [streakCount, setStreakCount] = useState(0);
  const [highestStreakCount, setHighestStreakCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const updateStreaks = () => {
      setLoading(true);

      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.warn("User is not logged in.");
          return; // Exit if no user is logged in
        }

        try {
          const normalizeDate = (date) => {
            const normalizedDate = new Date(date);
            normalizedDate.setHours(0, 0, 0, 0);

            return normalizedDate.getTime();
          }


          const username = user.displayName.toLowerCase();

          const docRef = doc(db, 'users', username);
          const userSnap = await getDoc(docRef);

          if (!userSnap.exists()) {
            console.warn("User data does not exist in Firestore.");
            return;
          }

          const userData = userSnap.data();
          const lastDate = normalizeDate(userData.lastJournalDate);
          const currentDate = normalizeDate(Date.now());

          const userCurrentStreakCount = userData?.currentStreakCount || 0;
          const userHighestStreakCount = userData?.highestStreakCount || 0;

          const dayDifference = Math.floor((currentDate - lastDate) / (100 * 60 * 60 * 24));

          console.log(currentDate, lastDate);
          if (dayDifference > 1) {
            setStreakCount(0);
          } else {
            setStreakCount(userCurrentStreakCount);
          }
          setHighestStreakCount(userHighestStreakCount);
        } catch (error) {
          console.error("Error updating streaks:", error.message);
        } finally {
          setLoading(false);
        }
      });
    };

    updateStreaks();
    hasFetched.current = true;
  }, []);


  return (
    <>
     <main className='calendar-container'>
       <SideBar currentPage='calendar' />

       <div className='calendar-page'>
         <Topnavbar currentPageName='calendar' />

         <div className='calendar-wrapper'>
          <FullCalendar
           plugins={[dayGridPlugin, interactionPlugin]}
           initialView='dayGridMonth'
           height='100%'
           headerToolbar={{
             left: 'prev',
             center: 'title',
             right: 'next'
           }} />
         </div>

         <div className='streak-box'>
          <div className='streak-box-text'>
            <h2> Streak Insight </h2>
          </div>

          { loading ? (
            <Loader />
          ) :
          (<div className='streaks'>
            <div>
              <div>
                <img src='/icons/streak-icon.png' alt={streakCount} />
                <h1> { streakCount } </h1>
              </div>

              <p> current streak </p>
            </div>

            <div>
              <div>
                <img src='/icons/streak-icon-purple.png' />
                <h1> { highestStreakCount } </h1>
              </div>

              <p> Highest streak </p>
            </div>
          </div>)}

         </div>

         <BottomNav currentPage='calendar' />
       </div>
     </main>
    </>
  )
}

export default CalendarPage;
