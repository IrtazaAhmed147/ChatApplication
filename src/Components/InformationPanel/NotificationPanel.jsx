import React, { useEffect, useState } from 'react'
import { addFriend, getFriendRequests, getUserName, rejectRequest } from '../../Firebase/FirestoreFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { requestList } from '../../Actions/FireStoreAction';

const NotificationPanel = () => {

  const data = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  const [notifications, setNotifications] = useState([]);

  // Use the real-time listener for fetching notifications for the logged-in user
  useEffect(() => {
    const fetchNotifications = async () => {
      if (data?.isUser?.displayName) {
        try {
          // Fetch requests only for the current user (RecieverId)
          const notificationss = await getFriendRequests(data.isUser.displayName);
          setNotifications(notificationss);
          if (notificationss) {

            dispatch(requestList(notificationss))
          }

        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [data?.isUser?.displayName, dispatch]); // Fetch notifications when the userUid changes

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);
      // dispatch(filterRequestList(id))

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );


      // No need to manually update the notifications here; the real-time listener will handle it
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequest = (senderName, id) => {

    const fetchUsers = async (senderName ,id) => {
      try {

        const users = data.userDetails
        const ownerId = users.filter((value) => {
          return (value.userName === data.isUser.displayName) || (value.userName === senderName)
        })

        if(ownerId.length === 2) {

          await addFriend(ownerId[1].id, ownerId[0].userName)
          await addFriend(ownerId[0].id, ownerId[1].userName)
          
          await rejectRequest(id);
          // dispatch(filterRequestList(id))
          
          setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
       
      } else {
        console.log(ownerId)
      }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers(senderName, id)
  }


  return (
    <div className='InformationPanelBoxes'>
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
            {notifications.map((value) => {
              return <li key={value.id}> <h3>{value.SenderId}</h3> <p>has sent you a friend request</p> <button onClick={() => acceptFriendRequest(value.SenderId, value.id)}>Add</button> <button onClick={() => handleReject(value.id)}>Reject</button></li>
            })}


          </ul>
        </div>

      </div>

    </div>
  )
}

export default NotificationPanel
