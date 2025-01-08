import { useEffect, useState } from "react";

import { auth, db } from '../../firebase/firebase-init';

import { HiMiniPencilSquare, HiOutlineLockClosed, HiOutlineCamera } from "react-icons/hi2";
import {HiOutlineMail, HiOutlineLogout } from "react-icons/hi";
import { IoToggleOutline } from "react-icons/io5";

import Topnavbar from '../../components/Helpers/Topnavbar';
import SideBar from '../../components/Helpers/SideBar';
import BottomNav from '../../components/Helpers/BottomNav';
import './SettingsPage.css';
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, updateProfile } from "firebase/auth";


const SettingsPage = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [showModalWrapper, setShowModalWrapper] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);

 
  const handleShowModal = () => {
    setShowModalWrapper(false);
    setShowUsernameModal(false);
  }

  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    
    try {
      onAuthStateChanged(auth, async(user) => {
        if (!user) return;

        const oldUsername = user.displayName.toLowerCase();
        const newUsername = usernameInput;
        const normalizedUsername = newUsername.toLowerCase();

        const oldUserDocRef = doc(db, 'users', oldUsername);
        const newUserDocRef = doc(db, 'users', normalizedUsername);

        try {
          const oldUserDocSnap = await getDoc(oldUserDocRef);
          if (!oldUserDocSnap.exists()) {
            console.error(`Old username doesn't:`, err.message);
            return;
          }

          const newUserDocSnap = await getDoc(newUserDocRef);
          if (newUserDocSnap.exists()) {
            console.error('Username already choosen');
            return;
          }

          const oldUserData = oldUserDocSnap.data();
          await setDoc(newUserDocRef, oldUserData);

          await deleteDoc(oldUserDocRef);

          await updateProfile(user, {displayName: newUsername});

        } catch (err) {
          console.error(err.message);
        } 
      });
    } catch (err) {
      console.error('Error changing username:', err.message);
    }
  }

  useEffect(() => {
    if (showUsernameModal === true) setShowModalWrapper(true);
  }, [showUsernameModal]);

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
          <HiMiniPencilSquare className='icon' onClick={() => setShowUsernameModal(true)} />
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
        <form className={showUsernameModal ? 'modal' : 'hide-modal'} onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleUsernameUpdate(e)}>
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