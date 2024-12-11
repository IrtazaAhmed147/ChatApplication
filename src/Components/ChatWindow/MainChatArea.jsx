import React, { useEffect, useRef, useState } from 'react'
import './ChatWindow.css'
import { getMessages, sendMessage } from '../../Firebase/MessageFunctions'
const MainChatArea = (props) => {

  const [userInput, setUserInput] = useState('')
  const tempTextRef = useRef("")
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (props.sender.displayName && props.reciever?.[0]?.userName) {

      const unsubscribe = getMessages(props.sender.displayName, props.reciever[0].userName, (newMessages) => {
        setMessages(newMessages);
      });

      return () => {
        unsubscribe();
      };
    }

    // Cleanup listener on component unmount
  }, [props.sender.displayName, props.reciever])
  console.log(messages?.[0]?.time)



  const handleSend = () => {
    const text = tempTextRef.current
    // setUserInput(text)
    console.log(userInput)


    const handleSendMsg = async () => {
      try {
        if (text && props.reciever[0].userName && props.sender.displayName) {
          await sendMessage(props.sender.displayName, props.reciever[0].userName, text)
          console.log('msg sended')

        }
        console.log('send')
      } catch (error) {
        console.log(error)
      } finally {
        tempTextRef.current = ""; // Clear the ref value
        setUserInput(""); // Clear the state (optional for future reference)
        document.getElementById("messageInput").value = "";
      }

    }
    handleSendMsg()


  }

  const convertTime = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      return "Invalid Time"; // Handle invalid or missing time
    }
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    const min = new Date(milliseconds).getMinutes()
    let hour = new Date(milliseconds).getHours()
    const period = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Format minutes to always be two digits
    const formattedMinutes = min < 10 ? `0${min}` : min;

    return `${hour}:${formattedMinutes} ${period}`;

  }


  if (!props.reciever?.[0]?.userName) return <h1>Loading</h1>

  return (



    <div className='mainArea'>
      <div className='textshowArea'>
        <ul>
          {messages.map((msg) => (
            <li key={msg.time} className={props.sender.displayName === msg.SenderId ? 'sender': 'reciever'}><p>{msg.message}</p> <p className='timeStamp'>{
              // convertTime({ seconds: msg.time.seconds, nanoseconds: msg.time.nanoseconds })
              msg.time ? convertTime({ seconds: msg.time.seconds, nanoseconds: msg.time.nanoseconds }) : "Loading time..."

            }</p></li>
          ))}

        </ul>
      </div>
      <div className='textArea'>
        <div className='textBox'>

          <input type="text" id="messageInput" onChange={(e) => tempTextRef.current = e.target.value} /> <button onClick={handleSend}>send</button>
        </div>
      </div>
    </div>
  )
}

export default MainChatArea
