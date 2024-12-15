import React, { useEffect } from 'react'

import { checkUser } from '../Firebase/AuthFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserName } from '../Firebase/FirestoreFunctions'
import SidePanel from '../Components/SidePanel/SidePanel'
// import { requestFunction } from '../Utility/NotificationPermission'
const Home = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const data = useSelector((state) => state.auth);

  useEffect(() => {
    checkUser(dispatch);  
    getUserName(dispatch);
  }, [dispatch]);

  // useEffect(()=> {
  //   if(data?.isUser) {

  //     requestFunction(data.isUser.displayName)
  //   }
  // }, [data?.isUser])

  useEffect(() => {
    if (!data.isUser) {
      navigate('/login')
    
    }
    
  }, [data, navigate])

  return (
    <>
      
      <SidePanel   />
        
    </>
  )
}

export default Home
