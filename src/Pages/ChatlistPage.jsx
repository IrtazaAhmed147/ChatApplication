import React from 'react'
import './Pages.css'
import FriendsList from '../Components/SideBar/FriendsList'
import { signOutUser } from '../Firebase/AuthFunctions'
import { useNavigate } from 'react-router-dom'
const ChatlistPage = () => {

  const navigate = useNavigate()

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
        <button onClick={() => handleLogOut()} className='logOutBtn'>LogOut</button>
      </div>
      <FriendsList />
    </div>
  )
}

export default ChatlistPage
