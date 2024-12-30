import { HiMiniPencilSquare } from "react-icons/hi2";
import Topnavbar from '../../components/Helpers/Topnavbar';
import BottomNav from '../../components/Helpers/BottomNav';
import './SettingsPage.css';


const SettingsPage = () => {
  return (
    <main className='setting-container'>
      <Topnavbar currentPageName='Settings' />
      

      <div className='setting-user-info'>
        <div className='setting-userdp-holder'>
        
        </div>

        <div className='username-holder'>
          <h1> John Doe </h1>
          <HiMiniPencilSquare className='icon' />
        </div>
      </div>


      <div className='settings-menu'>
        <div>
         <div className='icon-holder'></div>
         <h2> Edit email </h2>
        </div>

        <div></div>

        <div></div>

        <div></div>

        <div></div>
      </div>


      <BottomNav currentPage='setting' />
    </main>
  )
}

export default SettingsPage;