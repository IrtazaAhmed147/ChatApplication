import React, { useEffect } from 'react'

import { checkUser } from '../Firebase/AuthFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserName } from '../Firebase/FirestoreFunctions'
const Home = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state) => state.auth);
 

  useEffect(() => {
    checkUser(dispatch);  
    getUserName(dispatch)
  }, [dispatch]);

  useEffect(() => {
    if (!data) {
      navigate('/login')
    
    }
    
  }, [data, navigate])

  return (
    <>
      
        
    </>
  )
}

export default Home
