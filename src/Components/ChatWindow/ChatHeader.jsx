import React from 'react'
import './ChatWindow.css'
const ChatHeader = (props) => {

  console.log(props.user[0])

  // const [userName] = props.user[0]


  return (
    <div className='chatHeader'>
      <h1>{props.user.length === 0 ? '' : props.user[0].name}</h1>
      <p className='username'>Last seen 10:45pm</p>
    </div>
  )
}

export default ChatHeader
