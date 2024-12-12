
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import sideDesignPic from './Assets/sideDesignsPic.png'
// import Navbar from '../Components/Navbar'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import ChatlistPage from './Pages/ChatlistPage';
import ChatwindowPage from './Pages/ChatwindowPage';
import FindPeoplePage from './Pages/FindPeoplePage';
import SidePanel from './Components/SidePanel/SidePanel';
import SettingPage from './Pages/SettingPage';

function App() {


  console.log(window.location.pathname)

  return (
    <>
      <Router>

        <div className=' sideDesign'>
          <img className='upperimage' src={sideDesignPic} alt="" />
          <img className='bottomimage' src={sideDesignPic} alt="" />
        </div>

        <div className='main'>
          <div className='box'>
            <Navbar />
            <div className='contentBox'>
       
              {/* {(window.location.pathname === '/' || window.location.pathname === '/chats' || window.location.pathname === '/findpeople') && <SidePanel /> } */}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chats' element={<ChatlistPage />} />
                <Route path='/settings' element={<SettingPage />} />
                <Route path='/chat/:userId' element={<ChatwindowPage />} />
                <Route path='/findpeople' element={<FindPeoplePage />} />


                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />

              </Routes>


            </div>
          </div>
        </div>


      </Router>
    </>
  );
}

export default App;
