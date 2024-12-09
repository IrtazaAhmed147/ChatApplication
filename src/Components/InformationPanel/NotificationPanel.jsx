import React, { useEffect, useState } from 'react'
import { getFriendRequests } from '../../Firebase/FirestoreFunctions'

const NotificationPanel = () => {

  const [notifications, setNotifications] = useState([])


  useEffect(()=> {
    const checkNotifications = async ()=> {

      const friendRequests = await getFriendRequests()
      setNotifications(friendRequests)
        console.log(notifications)
    }
    // checkNotifications()
  })



  return (
    <div  className='InformationPanelBoxes'>
          <div className='scrollable-container' style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'scroll',
        overflowX: 'hidden',
        paddingBottom: '5px',
        minHeight: '220px',

      }}>

        <div>
          <ul style={{ listStyle: 'none' }}>
           <li> <h3>Jupiter</h3> <p>Jupiter has sent you a friend request</p> <button>Add</button> <button>Reject</button></li>


          </ul>
        </div>

      </div>
      
    </div>
  )
}

export default NotificationPanel
