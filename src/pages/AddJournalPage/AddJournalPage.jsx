import { useState } from 'react';

import { auth, db} from '../../firebase/firebase-init';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import { toast } from 'sonner';
import SpeechToText from '../../functions/speechToText';
import Topnavbar from '../../components/Helpers/Topnavbar';
import SideBar from '../../components/Helpers/SideBar';
import JournalActionTab from '../../components/Helpers/JournalActionTab';
import './Style.css';
import speechToText from '../../functions/speechToText';


const AddJournalPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const writeWithVoice = async () => {
    try {
      toast.info('Voice text started');

      const result = await SpeechToText();
      
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
    if (content.trim() === '') {
      toast.error('Journal content is already empty');
      return;
    }

    setContent('');
    toast.success('Journal content cleared');
  }

  const addJournalMood = async () => {
    alert('Set mood')
  }
  

  const validateJournal = async (title, content) => {
    try {
      if (title.trim() == '') return 'Please input your journal title';
      if (content.trim() == '') return 'Empty journal content';
    } catch (err) {
      console.error(err.message + 'me')
    }
  }

  const saveJournal = async () => {
    const validateErrors = await validateJournal(title, content);
    
    try {
      if (validateErrors) throw new Error(validateErrors);

      onAuthStateChanged(auth, async (user) => {
        try {
          // check if user is signed in
          if (!user) return;

          // get user id
          const userId = user.uid;

          // make a reference to journals collection 
          const journalRef = collection(db, 'journals');

          // define journal data structure 
          const journalData = {
            title,
            content,
            userId,
            createdAt: serverTimestamp()
          }

          // save journal
          await addDoc(journalRef, journalData);

          // notify user of successfull adding of journal
          toast.success('Journal added successfully');

          // reset inputs
          setTitle('');
          setContent('');

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
    addJournalMood,
    saveJournal
  }


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

        <JournalActionTab actions={tabActions} />
      </div>
    </main>
   </>
  )
}


export default AddJournalPage