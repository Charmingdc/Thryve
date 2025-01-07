import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { auth, db } from '../../firebase/firebase-init';

import { toast } from 'sonner';
import SpeechToText from '../../functions/speechToText';
import validateJournal from '../../functions/validateJournal';

import JournalActionTab from '../../components/Helpers/JournalActionTab';
import MoodsBar from '../../components/Helpers/MoodsBar';
import SideBar from '../../components/Helpers/SideBar';
import Topnavbar from '../../components/Helpers/Topnavbar';

import './Style.css';


const AddJournalPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [showMoodBar, setShowMoodBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const writeWithVoice = async () => {
    try {
      toast.info('Voice text started');

      // wait for speech transcript
      const result = await SpeechToText();

      // condition to check if user have finish speaking
      if (result !== 'transcription endéd') {
        setContent((prev) => (
          prev ? `${prev} ${result}` : result
        ));
       } else {
        toast.info('Voice text ended, microphone closed');
       }
    } catch (error) {
      console.error(error.message);
    }
  }


  const clearContent = async () => {
    // check if content is already empty
    if (content.trim() === '') {
      toast.error('Journal content is already empty');
      return;
    }

    // clear journal content
    setContent('');
    toast.success('Journal content cleared');
  }


  const handleMoodUpdate = async (newMood) => {
    try {
      // update mood state
      setMood(newMood);
    } catch (error) {
       console.error(error.message);
    }
  }
  const toggleMoodsBar = async () => {
    // update state to display mood bar
    setShowMoodBar(!showMoodBar);
  }

const updateStreak = async () => {
  const username = auth.currentUser?.displayName.toLowerCase();
  if (!username) return;

  try {
    const normalizeDate = (date) => {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      return normalizedDate.getTime();
    }

    const userRef = doc(db, 'users', username);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    const currentDate = normalizeDate(Date.now());
    const lastJournalDate = normalizeDate(userData?.lastJournalDate) || null; // Handle missing date
    let currentStreakCount = userData?.currentStreakCount || 0; // Default to 0 for new users
    let highestStreakCount = userData?.highestStreakCount || 0;
    

    if (!lastJournalDate) {
      // Initialize streak for new users or if lastJournalDate is missing
      await setDoc(userRef, { currentStreakCount: 1, lastJournalDate: currentDate, highestStreakCount: 1 }, { merge: true });
      return;
    }

    const dayDifference = (currentDate - lastJournalDate) / (100 * 60 * 60 * 24);

    if (dayDifference === 1) {
      // Increment streak if exactly one day has passed
      currentStreakCount += 1;
      if (currentStreakCount >= highestStreakCount) highestStreakCount = currentStreakCount;
      await setDoc(userRef, { currentStreakCount, lastJournalDate: currentDate, highestStreakCount }, { merge: true });
    } else if (dayDifference > 1) {
      // Reset streak if more than one day has passed
      await setDoc(userRef, { currentStreakCount: 1, lastJournalDate: currentDate }, { merge: true });
    }
  } catch (error) {
    console.error('Error updating streak:', error.message);
  }
}


  const saveJournal = async () => {
    const validateErrors = await validateJournal(title, content);

    try {
      if (validateErrors) throw new Error(validateErrors);
      if (!mood || mood === '') throw new Error('Please set a mood for this journal');

      // display loading toast
      const toastId = toast.loading('Saving your journal...');
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          // check if user is signed in
          if (!user) return;

          // get user id
          const userId = user.uid;

          // make a reference to journals collection
          const journalRef = collection(db, 'journals');

          // define journal data structure
          const journalData = {
            journalTitle: title,
            journalContent: content,
            journalMood: mood,
            userId,
            createdAt: serverTimestamp()
          }

          // save journal
          await addDoc(journalRef, journalData);

          // dismiss loading toast
          if (toastId) toast.dismiss(toastId);
          updateStreak();

          // notify user of successfull adding of journal
          toast.success('Journal added successfully');

          // reset inputs
          setTitle('');
          setContent('');

          // unsubscribe from onAuthStateChanged listener
          unsubscribe();

          // redirect to home page
          navigate('/home');
        } catch (err) {
          toast.error(err.message);
        }
      });
    } catch (err)  {
      console.error(err.message)
      toast.error(err.message);
    }
  }

  const tabActions = {
    writeWithVoice,
    clearContent,
    toggleMoodsBar,
    saveJournal
  }


  useEffect(() => {
   if (mood) toast.info(`Selected mood in ${mood.toLocaleUpperCase()}`)
  }, [mood]);

  return (
   <>
    <main className='add-journal-container'>
      <SideBar currentPage='home' />

      <div className='add-journal-page'>
        <Topnavbar currentPageName='New Journal' />

        <div className='inputs-container'>
          <input
            className='title-input'
            type='text'
            placeholder='Untitled'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <textarea
            className='main-input'
            placeholder='Write your journal content here'
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        </div>


        {showMoodBar && (
          <MoodsBar onMoodSelect={handleMoodUpdate} />
        )}
        <JournalActionTab actions={tabActions} />
      </div>
    </main>
   </>
  )
}


export default AddJournalPage
