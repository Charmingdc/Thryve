import GratefulIcon from '../../../assets/icons/grateful.png';
import JoyfulIcon from '../../../assets/icons/joyful.png';
import InspiredIcon from '../../../assets/icons/inspired.png';
import PeacefulIcon from '../../../assets/icons/meditate.png';
import HopefulIcon from '../../../assets/icons/hopeful.png';

import './Style.css';

const MoodsBar = ({onMoodSelect}) => {
   const handleMoodClick = (mood) => {
      onMoodSelect(mood);
   }


   return (
     <div className='moods-bar'>
        <button onClick={() => handleMoodClick('grateful')}>
         <img src={GratefulIcon} alt='Grateful icon' className='icon' />
        </button>

        <button onClick={() => handleMoodClick('joyful')}>
         <img src={JoyfulIcon} alt='joyful icon' className='icon' />
        </button>

        <button onClick={() => handleMoodClick('inspired')}>
         <img src={InspiredIcon} alt='inspired icon' className='icon' />
        </button>

        <button onClick={() => handleMoodClick('peaceful')}>
         <img src={PeacefulIcon} alt='peaceful icon' className='icon' />
        </button>

        <button onClick={() => handleMoodClick('hopeful')}>
         <img src={HopefulIcon} alt='hopeful icon' className='icon' />
        </button>
     </div>
   )
}


export default MoodsBar;