import React, { useEffect } from 'react'
import sideDesignPic from '../Assets/sideDesignsPic.png'
import Navbar from '../Components/Navbar'
import ChatlistPage from './ChatlistPage'
import ChatwindowPage from './ChatwindowPage'
import FindPeoplePage from './FindPeoplePage'
import { checkUser } from '../Firebase/AuthFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state) => state.authFunc);
  console.log(data)

  useEffect(() => {
    checkUser(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (!data) {
      navigate('/login')
      console.log(data)
    }
  }, [data, navigate])

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
