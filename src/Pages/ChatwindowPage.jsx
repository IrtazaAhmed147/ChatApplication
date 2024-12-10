import React from 'react'
import './Pages.css'
import ChatHeader from '../Components/ChatWindow/ChatHeader'
import { useParams } from 'react-router-dom'
import MainChatArea from '../Components/ChatWindow/MainChatArea'
const ChatwindowPage = () => {

  const param = useParams()
  console.log(param)


  return (
    <div className='chatWindowPageBox'>
     <ChatHeader />
      <MainChatArea />
    </div>
  )
}

export default ChatwindowPage
