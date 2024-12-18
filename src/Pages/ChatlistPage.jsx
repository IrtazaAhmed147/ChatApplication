import React, { useEffect, useState } from 'react'
import './Pages.css'
import FriendsList from '../Components/SideBar/FriendsList'
import { checkUser } from '../Firebase/AuthFunctions'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getUserName } from '../Firebase/FirestoreFunctions'
import SidePanel from '../Components/SidePanel/SidePanel'
import { isOnline, networkListener } from '../Utility/CheckNetwork'
const ChatlistPage = () => {

  const [onlineStatus, setOnlineStatus] = useState(isOnline());

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state) => state.auth);
  const dataTheme = useSelector((state)=> state.fireStore)
 

  const {theme} = dataTheme

  useEffect(() => {
    const cleanupListeners = networkListener(
      () => setOnlineStatus(true),
      () => setOnlineStatus(false)
    );

    return cleanupListeners; // Cleanup on component unmount
  }, []);

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
      <div className='chatListPageBox' style={{backgroundColor: theme === 'light' ? '#fff' : 'var(--main-dark-color)'}}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '10%'
        }}>

          <h1 style={{ margin: '10px 0px 0px 3%', color: theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)' }}>Chats</h1>


        </div>
        <FriendsList theme={theme} onlineStatus={onlineStatus}/>
      </div>
    </>
  )
}

export default ChatlistPage
