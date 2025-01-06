import "@fullcalendar/common/main.css"; // Core CSS
import dayGridPlugin from "@fullcalendar/daygrid"; // DayGrid view plugin
import interactionPlugin from "@fullcalendar/interaction"; // Interaction plugin (dragging, date click)
import FullCalendar from '@fullcalendar/react';
// import "@fullcalendar/timegrid/main.css";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import BottomNav from '../../components/Helpers/BottomNav';
import SideBar from '../../components/Helpers/SideBar';
import Topnavbar from '../../components/Helpers/Topnavbar';
import { auth, db } from '../../firebase/firebase-init';
import './Style.css';


const CalendarPage = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const updateStreaks = () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.warn("User is not logged in.");
          return; // Exit if no user is logged in
        }

        try {
          const username = user.displayName;
          console.log(username);

          const docRef = doc(db, 'users', username);
          const userSnap = await getDoc(docRef);

          if (!userSnap.exists()) {
            console.warn("User data does not exist in Firestore.");
            return;
          }

          const userData = userSnap.data();
          const lastDate = new Date(userData.lastJournalDate);
          const currentDate = new Date();

          const dayDifference = Math.floor((currentDate - lastDate) / 86400000);
          console.log(dayDifference);

          if (dayDifference === 1) {
            setStreak(userData.streak);
            console.log("Streak maintained:", userData.streak);
          } else if (dayDifference > 1) {
            console.log("No streak or missed a day");
            await setDoc(docRef, { streak: 0, lastJournalDate: currentDate }, { merge: true });
            setStreak(0); // Reset streak locally as well
          }
          if (dayDifference === 0) console.log("You've added a journal today")
        } catch (error) {
          console.error("Error updating streaks:", error.message);
        }
      });
    };

    updateStreaks();
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

          <div className='streaks'>
            <div></div>
            <div></div>
          </div>
         </div>

         <BottomNav currentPage='calendar' />
       </div>
     </main>
    </>
  )
}

export default CalendarPage;
