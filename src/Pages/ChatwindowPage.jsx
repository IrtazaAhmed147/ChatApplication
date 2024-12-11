import React, { useEffect, useState } from 'react'
import './Pages.css'
import ChatHeader from '../Components/ChatWindow/ChatHeader'
import { useNavigate, useParams } from 'react-router-dom'
import MainChatArea from '../Components/ChatWindow/MainChatArea'
import { useSelector } from 'react-redux'
const ChatwindowPage = () => {

  const data = useSelector((state) => state.fireStore);
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (auth.isUser === false) {
      navigate('/chats')
    
    }
    
  }, [data, navigate])
  const [user, setUser] = useState([])
  console.log(data)

  const param = useParams()
  console.log(param)
  useEffect(()=> {
    try {
      if (data) {
  
        const userr = data.friends?.filter((value)=> {
          return  value.userUid === param.userId
        })
        const res = userr
        setUser(res)
        console.log(res)
      }
      
    } catch (error) {
      console.log(error)
    }
  }, [data])


  return (
    <div className='chatWindowPageBox'>
     <ChatHeader user={user}/>
      <MainChatArea reciever={user} sender={auth.isUser}  />
    </div>
  )
}

export default ChatwindowPage
