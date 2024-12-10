import React, { useEffect } from 'react'
import './Pages.css'
import FriendsList from '../Components/SideBar/FriendsList'
import { checkUser, signOutUser } from '../Firebase/AuthFunctions'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import { IoMdSettings } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { getUserName } from '../Firebase/FirestoreFunctions'
const ChatlistPage = () => {



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


  const handleLogOut = async () => {
    console.log('logout process')
    try {

      await signOutUser()
      navigate('/login')

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='chatListPageBox'>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        <h1 style={{ margin: '0px' }}>Chats</h1>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <IoMdSettings />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-2">Theme</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Notifications</Dropdown.Item>
            <Dropdown.Item href="#/action-1"><button onClick={() => handleLogOut()} className='logOutBtn'>LogOut</button></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>
      <FriendsList />
    </div>
  )
}

export default ChatlistPage
