
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import sideDesignPic from './Assets/sideDesignsPic.png'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import ChatlistPage from './Pages/ChatlistPage';
import ChatwindowPage from './Pages/ChatwindowPage';
import FindPeoplePage from './Pages/FindPeoplePage';
import SettingPage from './Pages/SettingPage';
import { useSelector } from 'react-redux';

function App() {

  const data = useSelector((state)=> state.fireStore)
 

  const {theme} = data

  return (
    <>
      <Router>

        <div className=' sideDesign'>
          <img className='upperimage' src={sideDesignPic} alt="" />
          <img className='bottomimage' src={sideDesignPic} alt="" />
        </div>

        <div className='main'>
          <div className='box' style={{backgroundColor: theme === 'light' ? '#fff' : 'var(--back-dark-color)'}}>
            <Navbar />
            <div className='contentBox' style={{backgroundColor: theme === 'light' ? '#fff' : 'var(--back-dark-color)'}}>

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
