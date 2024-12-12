import React, { useEffect } from 'react'

import { checkUser } from '../Firebase/AuthFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserName } from '../Firebase/FirestoreFunctions'
import SidePanel from '../Components/SidePanel/SidePanel'
const Home = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const data = useSelector((state) => state.auth);
  console.log(data)

  useEffect(() => {
    checkUser(dispatch);  
    getUserName(dispatch);
  
  
  //  const currUser = data.isUser.displayName
  //  if(data.isUser.displayName === onlineUsers) 
  }, [dispatch]);

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
