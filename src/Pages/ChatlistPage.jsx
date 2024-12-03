import React from 'react'
import './Pages.css'
import FriendsList from '../Components/SideBar/FriendsList'
const ChatlistPage = () => {
  return (
    <div className='chatListPageBox'>
       <h1 style={{margin: '0px'}}>Chats</h1>
       <FriendsList />
    </div>
  )
}

export default ChatlistPage
