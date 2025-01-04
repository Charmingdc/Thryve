import { useState, useEffect } from 'react';
import { useNavigate

 } from 'react-router-dom';
import { auth, db} from '../../firebase/firebase-init';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import { toast } from 'sonner';
import SpeechToText from '../../functions/speechToText';
import validateJournal from '../../functions/validateJournal';

import Topnavbar from '../../components/Helpers/Topnavbar';
import SideBar from '../../components/Helpers/SideBar';
import JournalActionTab from '../../components/Helpers/JournalActionTab';
import MoodsBar from '../../components/Helpers/MoodsBar';

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