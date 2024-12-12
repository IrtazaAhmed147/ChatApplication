import React from 'react'
import './ChatWindow.css'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
const ChatHeader = (props) => {

  console.log(props.user[0])

  // const [userName] = props.user[0]

  const navigate= useNavigate()
  const handleBack = ()=> {
      navigate('/chats')
  }

  return (
    <div className='chatHeader'>
      <button className='backBtn' onClick={handleBack}><FaArrowLeftLong /></button>
      <div>

      <h1>{props.user.length === 0 ? '' : props.user[0].name}</h1>
      <p className='username'>Last seen 10:45pm</p>
      </div>
    </div>
  )
}

export default ChatHeader
