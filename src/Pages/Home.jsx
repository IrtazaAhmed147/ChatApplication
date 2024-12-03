import React from 'react'
import sideDesignPic from '../Assets/sideDesignsPic.png'
import Navbar from '../Components/Navbar'
import ChatlistPage from './ChatlistPage'
import ChatwindowPage from './ChatwindowPage'
import FindPeoplePage from './FindPeoplePage'
const Home = () => {
  return (
   <>
     <div className=' sideDesign'>
        <img className='upperimage' src={sideDesignPic} alt="" />
        <img className='bottomimage' src={sideDesignPic} alt="" />
      </div>

      <div className='main'>
        <div className='box'>
          <Navbar />
          <div className='contentBox'>
            <ChatlistPage />
            <ChatwindowPage />
            <FindPeoplePage />
          </div>
        </div>
      </div>
   </>
  )
}

export default Home
