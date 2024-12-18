import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import './SideBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, getFriendList } from '../../Firebase/FirestoreFunctions';
import { isUserFriend } from '../../Actions/FireStoreAction';
import { useNavigate } from 'react-router-dom';
import { IoChatbox } from "react-icons/io5";

import Loader from '../Loader'

const FriendsList = (props) => {

    const data = useSelector((state) => state.auth);
    const fireStore = useSelector((state) => state.fireStore);
    const [user, setUser] = useState([])
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    

    useEffect(() => {

        const fetchFriends = async () => {

            if (!props.onlineStatus) {
                return;
            }

            setError(true)
            try {
                if (data.userDetails) {
                    const res = data.userDetails?.filter((docs) => {
                        return docs.userName === data.isUser.displayName;
                    });
                   
                    if (res.length > 0) {
                        const friendListSnapshot = await getFriendList(res[0].id);
                        const friendData = friendListSnapshot.docs.map((d) => d.data());
                      
                        const sortedFriends = friendData.sort((a, b)=> {
                            const aTime = a.lastMessageGet?.seconds || 0;
                            const bTime = b.lastMessageGet?.seconds || 0;
                            return bTime - aTime;

                        })
                      
                        setUser(sortedFriends); // Correctly updates the user state.
                        dispatch(isUserFriend(sortedFriends))
                 
                    }
                }
            } catch (error) {
                console.error(error);
                setError(false)
            } finally {
                setError(false)
            }
        };

        fetchFriends();

    }, [data.isUser?.displayName, data.userDetails, dispatch, props.onlineStatus])


     useEffect(() => {
        const addTalkOrbit = async () => {

            


          try {
            const isAvailable = fireStore?.friends?.filter((value)=> {
                return value.userName === 'TalkOrbit'
            })
            
            const fetchedUsers = data?.userDetails || [];
            const talkOrbitUser = fetchedUsers.find((user) => user.userName === 'TalkOrbit');
            const onlineUser = fetchedUsers.find((user) => user.userName === data.isUser.displayName);
        

            if(isAvailable.length > 0 ){

                return;
            }
        

            if (talkOrbitUser && isAvailable.length === 0 && onlineUser.userName !== 'TalkOrbit') {
            
              await addFriend(onlineUser.id, talkOrbitUser); // user add talkorbit
     
              await addFriend(talkOrbitUser.id, onlineUser); //talk orbit add user
          
            }
          } catch (error) {
          
            console.log(error.message)
    
          }
        }
        addTalkOrbit()
      }, [data.isUser.displayName, data?.userDetails, fireStore.friends])



    const navigate = useNavigate()
    const handleChat = (id) => {
        navigate(`/chat/${id}`)
    }

    return (
        <>
            <div className='searchScrollParentContainer'>

                <div className='searchBox' style={{ width: '50%', marginLeft: '3%', marginBottom: '30px' , backgroundColor: props.theme === 'light' ? '#fff' : '#1c1c1c' }}>

                    <IoIosSearch size={30} color='#0a00bc' />
                    <input style={{ backgroundColor: props.theme === 'light' ? '#fff' : '#1c1c1c', color: props.theme === 'light' ? 'black' : '#fff' }} type="text" placeholder='Search' />
                </div>
                <div className='scrollable-container' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    paddingBottom: '5px',
                    minHeight: '87%',
                    width: '100%',
                    overflowY: 'auto'


                }}>

                    {!props.onlineStatus && <div className='ms-4' style={{ color: "red" }}>No Internet Connection</div>}
                    {/* <div> */}
                    <ul style={{ listStyle: 'none', padding: '0px', justifyContent: error ? 'center' : 'start', marginBottom: "0px" }}>
                        {error && <Loader />}
                        {!error && user?.map((value) => {
                            return <li style={{backgroundColor: props.theme === 'light' ? '#fff' : '#1b1b1b'}} key={value.userName || value.id} onClick={() => handleChat(value.userUid)} className='userBox'>
                                <span>

                                    <p style={{
                                        fontWeight: '600',
                                        fontSize: '21px',
                                        margin: '0px',
                                        color: props.theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)'
                                    }}>{value.name}</p>
                                    <p className='username'>{value.userName}</p>
                                </span>
                                    {value.lastMessageSeen === false && <p style={{color: 'rgb(101 101 219)',alignSelf: 'center', fontSize: '20px', fontWeight: '600'}}>New Chat <IoChatbox /></p>}
                            </li>
                        })}

                    </ul>
                    {/* </div> */}

                </div>
            </div>
        </>
    )
}

export default FriendsList
