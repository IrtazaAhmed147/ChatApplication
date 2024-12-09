import React, { useEffect, useState } from 'react'
import { FindReceiver, getFriendRequests } from '../../Firebase/FirestoreFunctions'
import { useSelector } from 'react-redux';

const NotificationPanel = () => {

  const data = useSelector((state) => state.authFunc);
  console.log("User Data:", data);

  const [notifications, setNotifications] = useState([]);
  const [updatedList, setUpdatedList] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch friend requests
        const friendRequests = await getFriendRequests();
        setNotifications(friendRequests);
        console.log(notifications)
        // Fetch receivers based on current user's displayName
        if (data?.isUser?.displayName) {
          const receiverSnapshot = await FindReceiver(data.isUser.displayName);
          const users = receiverSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setUpdatedList(users);
          console.log(updatedList)
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [data?.isUser?.displayName]); // Dependency on `displayName`

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
           {updatedList.map((value)=> {
            return <li key={value.id}> <h3>{value.SenderId}</h3> <p>has sent you a friend request</p> <button>Add</button> <button>Reject</button></li>
           })} 


          </ul>
        </div>

      </div>
      
    </div>
  )
}

export default NotificationPanel
