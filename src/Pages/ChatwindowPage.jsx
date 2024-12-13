import React, { useEffect, useState } from 'react'
import './Pages.css'
import ChatHeader from '../Components/ChatWindow/ChatHeader'
import { useNavigate, useParams } from 'react-router-dom'
import MainChatArea from '../Components/ChatWindow/MainChatArea'
import { useSelector } from 'react-redux'
import { fetchUserLastOnlineTime } from '../Firebase/RealTimedbFunction'
import { isOnline, networkListener } from '../Utility/CheckNetwork'
const ChatwindowPage = () => {

  const data = useSelector((state) => state.fireStore);
  const auth = useSelector((state) => state.auth);
  const [lastSeen, setLastSeen] = useState("Loading...");
  const [user, setUser] = useState([])
  const [onlineStatus, setOnlineStatus] = useState(isOnline());
  const navigate = useNavigate()
  useEffect(() => {
    if (!auth.isUser) {
      navigate('/chats')
    }
  }, [data, navigate, auth.isUser])

  const param = useParams()

   useEffect(() => {
      const cleanupListeners = networkListener(
        () => setOnlineStatus(true),
        () => setOnlineStatus(false)
      );
      console.log('asdf')
  
      return cleanupListeners; // Cleanup on component unmount
    }, []);

  useEffect(()=> {
    if(user.length !== 0) {
      console.log(user)
      try{

        const getLastOnlineTime = async () => {
          const status = await fetchUserLastOnlineTime(user[0].userName);
          setLastSeen(status);
          console.log(status) 
          console.log(lastSeen)
        };
        
        getLastOnlineTime();
      } catch (e) {
        console.log(e.message)
      }
      }
    }, [user, lastSeen])

  useEffect(() => {
    try {
      if (data) {

        const userr = data.friends?.filter((value) => {
          return value.userUid === param.userId
        })
        const res = userr
        setUser(res)
      }

    } catch (error) {
      console.log(error)
    }
  }, [data, param.userId])


  return (
    <div className='chatWindowPageBox'>
      <ChatHeader user={user} lastSeen={lastSeen}/>
      <MainChatArea onlineStatus={onlineStatus} reciever={user} sender={auth.isUser} />
    </div>
  )
}

export default ChatwindowPage
