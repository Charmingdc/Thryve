import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"; // DayGrid view plugin
import timeGridPlugin from "@fullcalendar/timegrid"; // TimeGrid plugin (week/day view)
import interactionPlugin from "@fullcalendar/interaction"; // Interaction plugin (dragging, date click)
import "@fullcalendar/common/main.css"; // Core CSS
// import "@fullcalendar/timegrid/main.css";

import SideBar from '../../components/Helpers/SideBar';
import Topnavbar from '../../components/Helpers/Topnavbar';
import BottomNav from '../../components/Helpers/BottomNav';
import './Style.css';


const CalendarPage = () => {
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