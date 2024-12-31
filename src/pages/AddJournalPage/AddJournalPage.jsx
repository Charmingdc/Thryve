import { useState } from 'react';
import Topnavbar from '../../components/Helpers/Topnavbar';
import SideBar from '../../components/Helpers/SideBar';
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

        <input 
          className='title-input' 
          type='text'
          placeholder='Untitled'
          value={titleInput} />
        
        <textarea 
          className='main-input'
          placeholder='Write your journal here'
          value={mainInput} />
      </div>
    </main>
   </>
  )
}


export default AddJournalPage