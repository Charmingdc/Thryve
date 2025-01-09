import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HiMiniPencilSquare, HiOutlineLockClosed, HiOutlineCamera, HiOutlineUser } from "react-icons/hi2";
import {HiOutlineMail, HiOutlineLogout } from "react-icons/hi";
import { IoImageOutline, IoToggleOutline } from "react-icons/io5";

import Loader from '../../components/Helpers/Loader';
import Topnavbar from '../../components/Helpers/Topnavbar';
import SideBar from '../../components/Helpers/SideBar';
import BottomNav from '../../components/Helpers/BottomNav';
import './SettingsPage.css';

import { auth, db } from '../../firebase/firebase-init';
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, updateProfile } from "firebase/auth";



const SettingsPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [usernameInput, setUsernameInput] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const [showModalWrapper, setShowModalWrapper] = useState(false);
  const [showDpModal, setShowDpModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  const [loading, setLoading] = useState(false);
 
  const handleShowModal = () => {
    setShowModalWrapper(false);
    setShowUsernameModal(false);
    setShowDpModal(false);
  }

  const getUserDetails = () => {
    const unsubscribe  = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails({
          displayName: user.displayName,
          photoUrl: user.photoURL || '/icons/default-dp.jpg',
          userId: user.uid
        })
      } else {
        console.log('No user signed in');
        setUserDetails(null);
      }
    }, (err) => {
      console.error('Error getting user data:', err.message);
    })
    return unsubscribe;
  }


  const handleDpUpdate = async (e) => {
    e.preventDefault();
    alert('started working on dp update');
    try {
      const file = e.target.files[0];
      console.log(file);
    } catch (err) {
      console.error('Error updating user dp:', err.message);
    }
  }


  const handleUsernameUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const unsubscribe = onAuthStateChanged(auth, async(user) => {
        if (!user) return;

        // get current username 
        const oldUsername = user.displayName.toLowerCase();
        // get inputed username 
        const newUsername = usernameInput;
        // convert new username to lowercase 
        const normalizedUsername = newUsername.toLowerCase();

        // reference to old user doc
        const oldUserDocRef = doc(db, 'users', oldUsername);
        // reference to new user doc
        const newUserDocRef = doc(db, 'users', normalizedUsername);

        try {
          // check if old user doc exist in the db
          const oldUserDocSnap = await getDoc(oldUserDocRef);
          if (!oldUserDocSnap.exists()) {
            toast.error(`Old username doesn't exist`);
            return;
          }

          // check if new username is already choosing 
          const newUserDocSnap = await getDoc(newUserDocRef);
          if (newUserDocSnap.exists()) {
            toast.error('Username already in use, please choose another one');
            return;
          }

          // get all data of the user
          const oldUserData = oldUserDocSnap.data();
          // copy old data to new document 
          await setDoc(newUserDocRef, oldUserData);

          // delete old doc
          await deleteDoc(oldUserDocRef);

          // update auth displayName property 
          await updateProfile(user, {displayName: newUsername});
        } catch (err) {
          console.error(err.message);
        } finally {
          getUserDetails();

          // reset all states 
          setLoading(false);
          setShowUsernameModal(false);
          setUsernameInput('');
          
          // unsubscribe from active listener 
          unsubscribe();
        }
      });
    } catch (err) {
      console.error('Error changing username:', err.message);
    }
  }
  
  useEffect(() => {
    const unsubscribe  = getUserDetails();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showUsernameModal === true) setShowModalWrapper(true);
    if (showUsernameModal === false) setShowModalWrapper(false);
  }, [showUsernameModal]);
  
  useEffect(() => {
    (showDpModal === true) ? setShowModalWrapper(true) : setShowModalWrapper(false);
  }, [showDpModal]);

  return (
    <main className='setting-container'>
     <SideBar currentPage='setting' />

     <div className='setting-page'>
      <Topnavbar currentPageName='Settings' />
      

      <div className='setting-user-info'>
        <div className='setting-userdp-holder'>
          <img
            src={userDetails.photoUrl}
            className='setting-userdp'
            alt={`${userDetails.displayName}'s display picture`} />
            
          <button className='change-dp-button'>
            <HiOutlineCamera className='icon' onClick={() => setShowDpModal(true)} />
          </button>
        </div>

        <div className='username-holder'>
          <h1> { userDetails.displayName } </h1>
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
        <form className={showDpModal ? 'modal' : 'hide-modal'} onClick={(e) => e.stopPropagation()} >
          <h2> Change display picture </h2>

          <input
            id='dp-picker'
            type='file'
            value={selectedFile}
            onChange={handleDpUpdate} />

          <label htmlFor='dp-picker' className='upload-wrapper'>
            <IoImageOutline className='icon' />
            <p> Upload or take a picture </p>
          </label>
        </form>

        <form className={showUsernameModal ? 'modal' : 'hide-modal'} onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleUsernameUpdate(e)}>
          <h2> Edit username </h2>

          <div className='group'>
            <HiOutlineUser className='input-icon' />
            <input 
              type='text'
              className='input'
              placeholder='Enter a unique username'
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)} />
          </div>
  
          <button className='save-button'> { loading ? <Loader /> : 'Save Changes' } </button>
        </form>
      </section>}

      <BottomNav currentPage='setting' />
     </div>
    </main>
  )
}

export default SettingsPage;