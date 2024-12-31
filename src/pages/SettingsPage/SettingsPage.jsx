import {
   HiMiniPencilSquare,
   HiOutlineLockClosed,
   HiOutlineDocumentText,
   HiOutlineCamera
} from "react-icons/hi2";
import { MdOutlinePassword } from "react-icons/md";
import {
  HiOutlineMail,
  HiOutlineLogout 
} from "react-icons/hi";
import { IoToggleOutline } from "react-icons/io5";
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
          <div className='setting-userdp'></div>
          <button className='change-dp-button'>
            <HiOutlineCamera className='icon' />
          </button>
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
            <IoToggleOutline className='icon' />
          </div>
          <h3> Change theme </h3>
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