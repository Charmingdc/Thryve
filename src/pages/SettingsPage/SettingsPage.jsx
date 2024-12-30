import {
   HiMiniPencilSquare,
   HiOutlineLockClosed,
   HiOutlineDocumentText
} from "react-icons/hi2";
import { MdOutlinePassword } from "react-icons/md";
import {
  HiOutlineMail,
  HiOutlineLogout 
} from "react-icons/hi";
import Topnavbar from '../../components/Helpers/Topnavbar';
import SideBar from '../../components/Helpers/SideBar';
import BottomNav from '../../components/Helpers/BottomNav';
import './SettingsPage.css';


const SettingsPage = () => {
  return (
    <main className='setting-container'>
     <SideBar currentPage='setting' />

     <div className='setting-page'>
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
          <div className='icon-holder'>
            <MdOutlinePassword className='icon' />
          </div>
          <h3> Edit pin </h3>
        </div>

        <div>
          <div className='icon-holder'>
            <HiOutlineMail className='icon' />
          </div>
          <h3> Edit email </h3>
        </div>

        <div>
          <div className='icon-holder'>
            <HiOutlineLockClosed className='icon' />
          </div>
          <h3> Edit password </h3>
        </div>

        <div>
          <div className='icon-holder'>
            <HiOutlineDocumentText className='icon' />
          </div>
          <h3> Terms </h3>
        </div>

        <div>
          <div className='icon-holder'>
            <HiOutlineLogout className='icon' />
          </div>
          <h3> Logout </h3>
        </div>
      </div>


      <BottomNav currentPage='setting' />
     </div>
    </main>
  )
}

export default SettingsPage;