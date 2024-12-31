import { HiMicrophone, HiPencilSquare, HiFaceSmile, HiCheckCircle } from "react-icons/hi2";

import './Style.css';


const JournalActionTab = () => {
  return (
    <nav className='journal-actiontab'>
      <button>
        <HiMicrophone className='icon' />
      </button>

      <button>
        <HiPencilSquare className='icon' />
      </button>

      <button>
        <HiFaceSmile className='icon' />
      </button>

      <button>
        <HiCheckCircle className='icon' />
      </button>
    </nav>
  )
}


export default JournalActionTab