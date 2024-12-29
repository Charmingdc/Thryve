import './SettingsPage.css';
import Topnavbar from '../../components/Helpers/Topnavbar';


const SettingsPage = () => {
  return (
    <main className='setting-container'>
      <Topnavbar currentPageName='Settings' />
      

      <div className='user-info'>
       <div className='setting-userdp-holder'>

       </div>

       <h1 className='username-holder'>
         John Doe
       </div>
      </div>
    </main>
  )
}

export default SettingsPage;