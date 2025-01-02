import { HiMicrophone, HiFaceSmile, HiCheckCircle } from "react-icons/hi2";
import { VscClearAll } from "react-icons/vsc";

import './Style.css';


const JournalActionTab = ({actions}) => {
  const {writeWithVoice, clearContent, addJournalMood, saveJournal} = actions;


  return (
    <nav className='journal-actiontab'>
      <button onClick={writeWithVoice}>
        <HiMicrophone className='icon' />
      </button>

      <button onClick={clearContent}>
        <VscClearAll className='icon' />
      </button>

      <button onClick={addJournalMood}> 
        <HiFaceSmile className='icon' />
      </button>

      <button onClick={saveJournal}>
        <HiCheckCircle className='icon' />
      </button>
    </nav>
  )
}


export default JournalActionTab