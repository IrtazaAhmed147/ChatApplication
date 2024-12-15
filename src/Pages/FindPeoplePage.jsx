import React, { useEffect } from 'react'
import './Pages.css'
import AddPeoplePanel from '../Components/InformationPanel/AddPeoplePanel'
import NotificationPanel from '../Components/InformationPanel/NotificationPanel'
import SidePanel from '../Components/SidePanel/SidePanel'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkUser } from '../Firebase/AuthFunctions'
import { getUserName } from '../Firebase/FirestoreFunctions'
const FindPeoplePage = () => {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state) => state.auth);
 

  useEffect(() => {
    if (!data.isUser) {
      checkUser(dispatch);  
    }
    if (!data.userDetails) {
      getUserName(dispatch)
    }
  }, [dispatch, data.isUser, data.userDetails]);

  useEffect(() => {
    if (!data.isUser) {
      navigate('/')
    
    }
    
  }, [data, navigate])


  return (
    <>
    <SidePanel />
    <div className='findPeoplePageBox'>
      <AddPeoplePanel />
      <NotificationPanel />
    </div>
    </>
  )
}

export default FindPeoplePage
