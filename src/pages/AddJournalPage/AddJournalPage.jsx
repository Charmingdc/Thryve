import { useState } from 'react';
import Topnavbar from '../../components/Helpers/Topnavbar';
import SideBar from '../../components/Helpers/SideBar';
import JournalActionTab from '../../components/Helpers/JournalActionTab';
import './Style.css';


const AddJournalPage = () => {
  const [titleInput, setTitleInput] = useState('');
  const [mainInput, setMainInput] = useState('');
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
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)} />
        
          <textarea 
            className='main-input'
            placeholder='Write your journal content here'
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)} />
        </div>

        <JournalActionTab />
      </div>
    </main>
   </>
  )
}


export default AddJournalPage