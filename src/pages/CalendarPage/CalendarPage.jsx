import { useNavigate } from "react-router-dom";

import "@fullcalendar/common/main.css"; 
import dayGridPlugin from "@fullcalendar/daygrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 
import FullCalendar from '@fullcalendar/react';

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

import BottomNav from '../../components/Helpers/BottomNav';
import Loader from '../../components/Helpers/Loader';
import SideBar from '../../components/Helpers/SideBar';
import Topnavbar from '../../components/Helpers/Topnavbar';
import { auth, db } from '../../firebase/firebase-init';
import './Style.css';


const CalendarPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [streakCount, setStreakCount] = useState('');
  const [highestStreakCount, setHighestStreakCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  
  
  
  const fetchJournals = () => {
    const currentUser = auth.currentUser; // get current user
    const userId = currentUser.uid;
    console.log('Current user id:', userId);
    
    const journalsCollection = collection(db, "journals");
    
    const q = query(journalsCollection, where('userId', '==', userId));

    return onSnapshot(q, (snapshot) => {
      const journalData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const moodColors = {
        grateful: "rgb(255, 223, 186)",
        joyful: "rgb(255, 165, 0)",
        inspired: "rgb(135, 206, 235)",
        peaceful: "rgb(144, 238, 144)",
        hopeful: "rgb(216, 191, 216)",
      };

      // Map Firestore data to FullCalendar format
      const formattedEvents = journalData.map((journal) => ({
        id: journal.id,
        title: journal.journalTitle,
        start: journal.createdAt.toDate().toISOString(),
        backgroundColor: moodColors[journal.journalMood],
        borderColor: moodColors[journal.journalMood],
      }));

      setEvents(formattedEvents);
    });
  };



  useEffect(() => {
    if (hasFetched.current) return;
    
    
    const unsubscribe = fetchJournals(); // fetch journals and update events state

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
 
 
    // Cleanup on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
    
    hasFetched.current = true;
  }, []);
  
  
  
  const handleEventClick = (info) => {
    navigate(`/view-journal/${info.event.id}`);
  }
  
  const handleEventMouseEnter = (info) => {
    toast.info('Journal title:', info.event.title);
  }
  
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
           events={events}
           eventClick={handleEventClick}
           eventMouseEnter={handleEventMouseEnter}
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
