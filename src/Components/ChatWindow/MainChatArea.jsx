import React from 'react'
import './ChatWindow.css'
const MainChatArea = () => {
  return (
    <div className='mainArea'>
      <div className='textshowArea'>
        <ul>
            <li>how are you</li>
        </ul>
      </div>
      <div className='textArea'>
        <div className='textBox'>

        <input type="text" /> <button>send</button>
        </div>
        </div>
    </div>
  )
}

export default MainChatArea
