import React, { useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import './InformationPanel.css'
import { getSendedRequest, sendRequest } from '../../Firebase/FirestoreFunctions'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import Loader from '../Loader'
import { Button } from 'react-bootstrap'
const AddPeoplePanel = (props) => {

  const [users, setUsers] = useState([])
  const [isFriend, setIsFriend] = useState(false)
  const [error, setError] = useState(false)
  const [isUserFound, setIsUserFound] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const tempTextRef = useRef("")
  const [pendingUsers, setPendingUsers] = useState([])
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [loader, setLoader] = useState(false)
  const data = useSelector((state) => state.auth);

  const fireStoreData = useSelector((state) => state.fireStore);
  
  useEffect(() => {
    const fetchSendedRequest = async () => {
      try {
        const SendedRequestsArr = await getSendedRequest(data.isUser.displayName)
      
        const res = SendedRequestsArr
        setPendingUsers(res)
      } catch (error) {
        console.log(error)
      }

    }
    fetchSendedRequest()
  }, [data.isUser.displayName, triggerUpdate])


  const handleSearchFriend = () => {
    const currentUserName = tempTextRef.current

    const fetchUsers = async () => {
      setError(true)
      try {
        setError(true)
        const fetchedUsers = data.userDetails;



        const avalaibleUsers = fetchedUsers.filter((user) => {
          return (user.userName === currentUserName) && (user.userName !== data.isUser.displayName)
        });
        setUsers(avalaibleUsers)
        if (avalaibleUsers.length !== 0) {
          const pendingUser = pendingUsers?.filter((user) => {
            return (user.RecieverId === avalaibleUsers[0].userName)
          })

          setIsPending(pendingUser.length !== 0 ? true : false)
        }


        if (avalaibleUsers.length !== 0) {
          setIsUserFound(false)
          const isUserFriend = fireStoreData.friends?.filter((user) => {
            return user.userName === avalaibleUsers[0].userName
          })

          setIsFriend(isUserFriend.length === 0 ? false : true)
        } else if (avalaibleUsers.length === 0) {

          setIsUserFound(true)
        } if (currentUserName.length === 0) {

          setIsUserFound(false)
        }
      } catch (error) {
        console.log(error);

      } finally {
        setError(false)
      }


    };
    fetchUsers()
  }
  const addFriendBtn = async () => {
    try {
      setLoader(true)
      
      await sendRequest(data.isUser.displayName, users[0].userName)
      setTriggerUpdate((prev) => !prev);
      setIsPending(true)
    } catch (error) {
      console.log(error)
    } finally {

      setLoader(false)
    }
  }



  return (
    <div className='InformationPanelBoxes'>
      <h1 style={{color: props.theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)'}}>Add Friends</h1>
      <div className='addfriendBox'>
        <div className='searchForm'>


          <div className='searchBox' style={{ marginBottom: isUserFound ? '20px' : '0px', backgroundColor: props.theme === 'light' ? '#fff' : '#1c1c1c' }} >
            <IoIosSearch size={30} color='#0a00bc' />

            <input style={{ backgroundColor: props.theme === 'light' ? '#fff' : '#1c1c1c', color: props.theme === 'light' ? 'black' : '#fff' }} onChange={(e) => tempTextRef.current = e.target.value} placeholder='Search' type="search" />
          </div>
          <Button style={{ marginBottom: isUserFound ? '20px' : '0px' }} variant='success' className='btn' onClick={handleSearchFriend}>Search</Button>
        </div>


        <div className='scrollable-container' style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          paddingBottom: '5px',
          minHeight: '220px',

        }}>


          <ul style={{ listStyle: 'none', padding: '0px', justifyContent: error ? 'center' : 'start' }}>
            {isUserFound && <p style={{ fontSize: '20px', color: fireStoreData.theme === 'light' ? 'black' : '#fff' }}>User not Found</p>}
            {error && <Loader />}
            {!error && users?.map((user) => {
              return <li key={user.userUid} className='userBox' style={{ flexDirection: 'row', backgroundColor: props.theme === 'light' ? '#fff' : '#1b1b1b' }}>


                <span>

                  <p style={{
                    fontWeight: '600',
                    fontSize: '21px',
                     color: props.theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)'
                  }}>{user.name}</p>
                  <p className='username'>{user.userName}</p>
                </span>
                  {loader && <Loader />}
                {!loader  && !isPending && !isFriend && <button className='cssbuttons-io-button' onClick={addFriendBtn}>
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                  </svg>
                  <span>Add</span>
                </button>}
                {isPending && <p style={{
                   color: props.theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)'
                }}>Request Sended</p>}
                {isFriend && <p className='icon' style={{
                   color: props.theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)'
                }}><FaCheck /></p>}

              </li>
            })}


          </ul>


        </div>
      </div>

    </div>
  )
}

export default AddPeoplePanel
