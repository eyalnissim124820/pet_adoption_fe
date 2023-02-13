import './App.css';

import "./Styles/Fonts/SF-Pro.ttf"
import LandingPage from './Pages/LandingPage';
import MainDashboard from "./Pages/MainDashboard"
import PWBLogo from "./attachments/PWB icon2.svg"
import PWBtext from "./attachments/Pets WithBenefits.svg"
import imacPhoto from "./attachments/od-imac.png"

import { useAuth } from './Contexts/AuthContext';
import { PetContextProvider } from './Contexts/PetContext';
import { UserContextProvider } from './Contexts/UserContext';



function App() {
  const { asGuest } = useAuth();


  return (
    <>
      <UserContextProvider>
        <PetContextProvider>
          <div className="App">
            <MainDashboard />
            <div className='onlyDesktop'>
              <div className='od-header'>
                <img src={PWBLogo} alt="PWBlogo" id='od-PWBlogo'></img>
                <img src={PWBtext} alt="PWBtext" id='od-PWBtext'></img>
              </div>
              <div className='od-body'>
                <div className='od-title'>Welcome To <p>Pets With Benefits.</p>You can use our service on your desktop...</div>
                <img src={imacPhoto} alt='imacPhoto' />
              </div>
            </div>
          </div>
        </PetContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App;
