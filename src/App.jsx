
import './App.css';
import sideDesignPic from './Assets/sideDesignsPic.png'
import Navbar from './Components/Navbar';
function App() {
  return (
    <>
      <div className=' sideDesign'>
        <img className='upperimage' src={sideDesignPic} alt="" />
        <img className='bottomimage' src={sideDesignPic} alt="" />
      </div>

      <div className='main'>
        <div className='box'>
          <Navbar/>
        </div>
      </div>
    </>
  );
}

export default App;
