import React, { useEffect } from 'react'

import { checkUser } from '../Firebase/AuthFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTheme, getUserName } from '../Firebase/FirestoreFunctions'
import SidePanel from '../Components/SidePanel/SidePanel'
import { themeAction } from '../Actions/FireStoreAction'
const Home = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()


  const data = useSelector((state) => state.auth);



  useEffect(() => {
    checkUser(dispatch);
    getUserName(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (data?.isUser) {

      const fetchTheme = async () => {
        try {
          const themeData = await getTheme(data.isUser.displayName);
          dispatch(themeAction(themeData[0].theme))

        } catch (error) {
          console.log(error)
        }
      };

      fetchTheme();

    }


  }, [data.isUser, dispatch])

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

      <SidePanel />

    </>
  )
}

export default Home
