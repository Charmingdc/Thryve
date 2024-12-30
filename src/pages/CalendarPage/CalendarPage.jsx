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

         </div>

         <div className='streak-box'>

         </div>

         <BottomNav currentPage='calendar' />
       </div>
     </main>
    </>
  )
}

export default CalendarPage;