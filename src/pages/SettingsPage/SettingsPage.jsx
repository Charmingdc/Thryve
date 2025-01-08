import { useState } from "react";


import {
   HiMiniPencilSquare,
   HiOutlineLockClosed,
   HiOutlineCamera
} from "react-icons/hi2";
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
  const [usernameInput, setUsernameInput] = useState('');
  const [showModalWrapper, setShowModalWrapper] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);


  const handleShowModal = () => {
    setShowModalWrapper(false);
    setShowUsernameModal(false);
  
  }
  const handleUsernameUpdate = () => {
    setShowModalWrapper(true);
    setShowUsernameModal(true);
  }

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
          <HiMiniPencilSquare className='icon' onClick={handleUsernameUpdate} />
        </div>
      </div>


      <div className='settings-menu'>
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


      {showModalWrapper && <section className='modals-wrapper' onClick={handleShowModal}>
        <form className={showUsernameModal ? 'modal' : 'hide-modal'} id='cg-username-modal'>
          <h2> Edit username </h2>

          <div className='group'>
            <HiOutlineMail className='input-icon' />
            <input 
             type='text'
             className='input'
             placeholder='Enter a unique username'
             value={usernameInput}
             onChange={(e) => setUsernameInput(e.target.value)} />
          </div>
  
           <button className='save-button'> Save Changes </button>
        </form>
      </section>}

      <BottomNav currentPage='setting' />
     </div>
    </main>
  )
}

export default SettingsPage;