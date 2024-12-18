import React, { useEffect, useState } from 'react'
import { addFriend, getFriendRequests, rejectRequest } from '../../Firebase/FirestoreFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { requestList } from '../../Actions/FireStoreAction';
import { Button } from 'react-bootstrap';
import Loader from '../Loader';

const NotificationPanel = (props) => {

  const data = useSelector((state) => state.auth);
  // const [loader, setLoader] = useState(null)
  const [loaderId, setLoaderId] = useState(null);

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
      setLoaderId(id)
      await rejectRequest(id);
      // dispatch(filterRequestList(id))

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );


      // No need to manually update the notifications here; the real-time listener will handle it
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderId(null)
    }
  };

  const acceptFriendRequest = (senderName, id) => {

    const fetchUsers = async (senderName ,id) => {
      try {
        setLoaderId(id)
        const users = data.userDetails
        const ownerId = users.filter((value) => {
          return (value.userName === data.isUser.displayName) || (value.userName === senderName)
        })

        if(ownerId.length === 2) {
          setLoaderId(id)

          await addFriend(ownerId[1].id, ownerId[0])
          await addFriend(ownerId[0].id, ownerId[1])
          
          await rejectRequest(id);
          // dispatch(filterRequestList(id))
          
          setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
       
      } 
      } catch (error) {
        console.log(error)
      } finally{
        setLoaderId(null)
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
        height: '100%',
        overflowY: 'auto',

      }}>

        <div>
          <ul style={{ listStyle: 'none', padding: '0px' }}>
            {notifications.map((value) => {
             

              return <li className='userBox' key={value.id} style={{alignItems: 'center', backgroundColor: props.theme === 'light' ? '#fff' : '#1b1b1b'}}> 
              <div>

              <h3 style={{margin: '0px', color: props.theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)'}}>{value.SenderId}</h3> <p style={{color: props.theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)'}}>has sent you a friend request</p> 
              </div>
              <div>
              {loaderId === value.id && <Loader />}
              {/* {<Loader />} */}
             {loaderId !== value.id  && <> <Button variant='success' className='btn  me-3' onClick={() => acceptFriendRequest(value.SenderId, value.id)}>Add</Button> 
              <Button variant='danger' className='btn' onClick={() => handleReject(value.id)}>Reject</Button> </>}
              </div>
              </li>
            })}


          </ul>
        </div>

      </div>

    </div>
  )
}

export default NotificationPanel
