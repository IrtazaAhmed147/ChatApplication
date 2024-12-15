import React, { useEffect, useRef, useState } from 'react'
import './ChatWindow.css'
import { deletMsg, getMessages, sendMessage } from '../../Firebase/MessageFunctions'
import { ListGroup } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
// import { getTokenFromDb } from '../../Firebase/CloudMessaging'
const MainChatArea = (props) => {

  const [userInput, setUserInput] = useState('')
  const tempTextRef = useRef("")
  const [messages, setMessages] = useState([]);
  const [isHolding, setIsHolding] = useState(false)
  const [currMsgId, setCurrMsgId] = useState('')

  const delay = 1000;
  let startPress = null;

  useEffect(() => {

    if (!props.onlineStatus) {
      console.log(props.onlineStatus)
      return;
    }

    if (props.sender.displayName && props.reciever?.[0]?.userName) {

      const unsubscribe = getMessages(props.sender.displayName, props.reciever[0].userName, (newMessages) => {
        const sortedMessages = newMessages.sort((a, b) => {
          const aTime = a.time?.seconds || 0;
          const bTime = b.time?.seconds || 0;
          return aTime - bTime;
        });

        setMessages(sortedMessages);
      });


      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }


  }, [props.sender.displayName, props.reciever, props.onlineStatus])

  useEffect(() => {
    const clickOutSide = () => {
      setIsHolding(false)
      setCurrMsgId('')
    }
    document.addEventListener('mousedown', clickOutSide)
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };

  }, [])


  const handleSend = () => {
    const text = tempTextRef.current
    // setUserInput(text)
    console.log(userInput)


    const handleSendMsg = async () => {
      try {
        if (text && props.reciever[0].userName && props.sender.displayName) {
          // await getTokenFromDb(props.reciever[0].userName, text)

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


  function mouseDown(id) {
    console.log('asdf')
    startPress = Date.now();
    setCurrMsgId(id)
  }

  function mouseUp(id) {
    console.log('chala')
    if (Date.now() - startPress > delay) {
      setCurrMsgId(id)
      setIsHolding(true)
    }
  }
  const handleDelMsg = async (sender, reciever, id) => {
    console.log('delete msg')
    try {
      await deletMsg(sender, reciever, id)

    } catch (error) {
      console.log(error)
    }
    console.log(id)
  }


  if (!props.reciever?.[0]?.userName) return <h1>Loading</h1>

  return (



    <div className='mainArea'>
      <div className='textshowArea scrollable-container'>
        <ul>
        {!props.onlineStatus && <div className='ms-4' style={{ color: "red" }}>No Internet Connection</div>}
          {messages.map((msg) => (
            <li onMouseDown={() => mouseDown(msg.id)} onMouseUp={() => mouseUp(msg.id)} key={msg.id} className={props.sender.displayName === msg.SenderId ? 'sender' : 'reciever'}>
              {currMsgId === msg.id && isHolding && <ListGroup onMouseDown={(e) => e.stopPropagation()}>
                <ListGroup.Item onClick={(e) => { e.stopPropagation(); handleDelMsg(msg.SenderId, msg.RecieverId, msg.id); }}>Delete <MdDelete /></ListGroup.Item>
                <ListGroup.Item onClick={(e) => e.stopPropagation()}>Copy</ListGroup.Item>
              </ListGroup>}
              <p>{msg.message}</p> <p className='timeStamp'>{
                msg.time ? convertTime({ seconds: msg.time.seconds, nanoseconds: msg.time.nanoseconds }) : "Loading time..."
              }</p>
            </li>
          ))}

        </ul>
      </div>
      <div className='textArea'>
        <div className='textBox'>

          <input type="text" id="messageInput" onChange={(e) => tempTextRef.current = e.target.value} />
           <button disabled={!props.onlineStatus}  onClick={handleSend}>send</button>
        </div>
      </div>
    </div>
  )
}

export default MainChatArea
