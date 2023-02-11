import './App.css';

import "./Styles/Fonts/SF-Pro.ttf"
import LandingPage from './Pages/LandingPage';
import MainDashboard from "./Pages/MainDashboard"

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
          </div>
        </PetContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App;
