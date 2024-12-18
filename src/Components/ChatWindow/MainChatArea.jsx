import React, { useEffect, useRef, useState } from 'react'
import './ChatWindow.css'
import { deletMsg, getMessages, isNewChat, latestMsgSend, markMessageAsSeen, sendMessage } from '../../Firebase/MessageFunctions'
import { ListGroup } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { TiTick } from 'react-icons/ti'
// import { getTokenFromDb } from '../../Firebase/CloudMessaging'
const MainChatArea = (props) => {

  // const [userInput, setUserInput] = useState('')
  const tempTextRef = useRef("")
  const [messages, setMessages] = useState([]);
  const [isHolding, setIsHolding] = useState(false)
  // const [currMsgId, setCurrMsgId] = useState('')

  const data = useSelector((state) => state.auth)

  const delay = 1000;
  const startPressRef = useRef(null); // Ref for tracking press start time
  const holdTimeoutRef = useRef(null);
  const currMsgId = useRef(null);


  useEffect(() => {

    if (!props.onlineStatus) {
      return;
    }

    if (props.sender.displayName && props.reciever?.[0]?.userName) {

      const unsubscribe = getMessages(props.sender, props.reciever[0], (newMessages) => {
        const sortedMessages = newMessages.sort((a, b) => {
          const aTime = a.time?.seconds || 0;
          const bTime = b.time?.seconds || 0;
          return aTime - bTime;
        });

        setMessages(sortedMessages);
      });

      markMessageAsSeen(props.sender, props.reciever[0], data.isUser.displayName)
      if (data.userDetails) {
        const res = data.userDetails?.filter((docs) => {
          return docs.userName === data.isUser.displayName;
        })
        if (res.length > 0) {

          isNewChat(props.reciever[0], res[0].id)
        }

      }
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }




  }, [props.sender.displayName, props.reciever, props.onlineStatus, props.sender, data.isUser.displayName, data.userDetails])

  const isMobileDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };


  useEffect(() => {

    const clickOutside = (event) => {
      // Check if the click is outside the specific message list or ListGroup
      const isClickInside = event.target.closest('.message-item') || event.target.closest('.ListGroup');
      if (!isClickInside) {
        if (isHolding) {
          setIsHolding(false);
          currMsgId.current = '';
        }
      }
    };

    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isHolding])



  const handleSend = () => {
    const text = tempTextRef.current


    const handleSendMsg = async () => {
      try {
        if (text && props.reciever[0].userName && props.sender.displayName) {
     
          await sendMessage(props.sender, props.reciever[0], text)
          if (data.userDetails) {
            const reciever = data.userDetails?.filter((docs) => {
              return docs.userName === props.reciever[0].userName;
            });
            const sender = data.userDetails?.filter((docs) => {
              return docs.userName === data.isUser.displayName;
            });
            if (reciever.length > 0 && sender.length > 0) {
              
              await latestMsgSend(reciever[0].id, sender[0].userName);
          
            }
          }

        }
      } catch (error) {
        console.log(error)
      } finally {
        tempTextRef.current = ""; // Clear the ref value
        // Clear the state (optional for future reference)
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
    let date = new Date(milliseconds).getDate()
    let month = new Date(milliseconds).getMonth() + 1
    let year = new Date(milliseconds).getFullYear()
    const period = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Format minutes to always be two digits
    const formattedMinutes = min < 10 ? `0${min}` : min;

    // return `${hour}:${formattedMinutes} ${period}`;
    return {
      time: `${hour}:${formattedMinutes} ${period}`,
      date: `${date}/${month}/${year}`
    }

  }


  function mouseDown(id) {
    startPressRef.current = Date.now(); // Record the time when the press starts
    // setCurrMsgId(id);
    currMsgId.current = id
   


    // Start the timeout for holding action
    holdTimeoutRef.current = setTimeout(() => {
     
      setIsHolding(true); // Set holding state after the delay
    }, delay);
  }
  function mouseUp(id) {
    if (holdTimeoutRef.current) {

      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  
    // Check if the press duration was less than the delay
    const elapsedTime = Date.now() - (startPressRef.current || 0);
    

    if (elapsedTime < delay) {
      setIsHolding(false); // Reset the holding state
      currMsgId.current = ''; // Reset the current message ID 
    }
  }
  const handleDelMsg = async (id) => {

    try {
      await deletMsg(props.sender, props.reciever[0], id)

    } catch (error) {
      console.log(error)
    }
  
  }

  const handleCopyMsg = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsHolding(false)
 

    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };


  if (!props.reciever?.[0]?.userName) return <h1>Loading</h1>

  return (



    <div className='mainArea'>
      <div className='textshowArea scrollable-container'>
        <ul className='scrollable-container'>
          {!props.onlineStatus && <div className='ms-4' style={{ color: "red" }}>No Internet Connection</div>}
          {messages.map((msg) => (

            <li onMouseDown={() => !isMobileDevice() && mouseDown(msg.id)}
              onMouseUp={() => !isMobileDevice() && mouseUp(msg.id)}
              onTouchStart={() => isMobileDevice() && mouseDown(msg.id)}
              onTouchEnd={() => isMobileDevice() && mouseUp(msg.id)}
              key={msg.id} style={{ display: msg.time ? '' : 'none', backgroundColor: props.theme === 'light' ? 'rgb(64 64 172)' : 'rgb(27 27 27)', flexWrap: 'wrap' }} className={props.sender.displayName === msg.SenderId ? 'sender' : 'reciever'}>



              {currMsgId.current === msg.id && isHolding && <ListGroup  onTouchStart={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                {msg.SenderId === data.isUser.displayName && (
                  <ListGroup.Item onClick={(e) => {
                    e.stopPropagation();
                    handleDelMsg(msg.id);
                  }}>
                    Delete <MdDelete />
                  </ListGroup.Item>
                )}
                <ListGroup.Item onClick={(e) => {
                  e.stopPropagation();
                  handleCopyMsg(msg.message);
                }}>Copy <MdDelete /></ListGroup.Item></ListGroup>}


              <p style={{ userSelect: 'none' }}>{msg.message}</p> <p className='timeStamp'>{
                msg.time ? convertTime({ seconds: msg.time.seconds, nanoseconds: msg.time.nanoseconds }).time + ` ${convertTime({ seconds: msg.time.seconds, nanoseconds: msg.time.nanoseconds }).date}` : " "
              } <TiTick style={{ fontSize: '20px' }} color={msg.seen === true ? '#00ff00' : '#fff'} /></p>
            </li>
          ))}

        </ul>
      </div>
      <div className='textArea' style={{ backgroundColor: props.theme === 'light' ? '#fff' : 'var(--back-dark-color)' }}>
        <div className='textBox' style={{ backgroundColor: props.theme === 'light' ? '#fff' : '#1c1c1c' }}>

          <input type="text" style={{ backgroundColor: props.theme === 'light' ? '#fff' : '#1c1c1c', color: props.theme === 'light' ? 'black' : '#fff' }} id="messageInput" onChange={(e) => tempTextRef.current = e.target.value} />
          <button disabled={!props.onlineStatus} onClick={handleSend}>send</button>
        </div>
      </div>
    </div>
  )
}

export default MainChatArea
