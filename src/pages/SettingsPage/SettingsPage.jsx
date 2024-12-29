import './SettingsPage.css';
import Topnavbar from '../../components/Helpers/Topnavbar';


const SettingsPage = () => {
  return (
    <main className='setting-container'>
      <Topnavbar currentPageName='Settings' />
      

      <div className='user-info'>
       <div className='setting-userdp-holder'>

       </div>

       <div className='username-holder'>
         <h1> John Doe </h1>
       </div>
      </div>
    </main>
  )
}

export default SettingsPage;