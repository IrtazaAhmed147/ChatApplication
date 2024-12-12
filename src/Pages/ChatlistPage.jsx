import React, { useEffect } from 'react'
import './Pages.css'
import FriendsList from '../Components/SideBar/FriendsList'
import { checkUser } from '../Firebase/AuthFunctions'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getUserName } from '../Firebase/FirestoreFunctions'
import SidePanel from '../Components/SidePanel/SidePanel'
const ChatlistPage = () => {



  const dispatch = useDispatch()
  const navigate = useNavigate()

  const data = useSelector((state) => state.auth);
 

  useEffect(() => {
    checkUser(dispatch);  
    getUserName(dispatch)
  }, [dispatch]);

  useEffect(() => {
    if (!data.isUser) {
      navigate('/')
    
    }
    
  }, [data, navigate])


  // const handleLogOut = async () => {
  //   console.log('logout process')
  //   try {

  //     await signOutUser()
  //     navigate('/login')

  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  return (
    <>
    <SidePanel />
    <div className='chatListPageBox'>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '10%    '
      }}>

        <h1 style={{ margin: '10px 0px 0px 3%' }}>Chats</h1>
        {/* <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <IoMdSettings />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-2">Theme</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Notifications</Dropdown.Item>
            <Dropdown.Item href="#/action-1"><button onClick={() => handleLogOut()} className='logOutBtn'>LogOut</button></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

      </div>
      <FriendsList />
    </div>
    </>
  )
}

export default ChatlistPage
