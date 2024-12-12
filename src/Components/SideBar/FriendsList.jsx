import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import './SideBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { getFriendList } from '../../Firebase/FirestoreFunctions';
import { isUserFriend } from '../../Actions/FireStoreAction';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader'

const FriendsList = () => {

    const data = useSelector((state) => state.auth);
    const [user, setUser] = useState([])
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {

        const fetchFriends = async () => {
            setError(true)
            try {
                // setError(true)
                if (data.userDetails) {
                    const res = data.userDetails?.filter((docs) => {
                        return docs.userName === data.isUser.displayName;
                    });

                    if (res.length > 0) {
                        const friendListSnapshot = await getFriendList(res[0].id);
                        const friendData = friendListSnapshot.docs.map((d) => d.data());
                        setUser(friendData); // Correctly updates the user state.
                        dispatch(isUserFriend(friendData))
                        console.log(friendData)
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

    }, [data.isUser?.displayName, data.userDetails, dispatch])

    const navigate = useNavigate()
    const handleChat = (id) => {
        navigate(`/chat/${id}`)
    }

    return (
        <>
            <div className='searchScrollParentContainer'>

                <div className='searchBox' style={{ width: '50%', marginLeft: '3%', marginBottom: '30px' }}>

                    <IoIosSearch size={30} color='#0a00bc' />
                    <input type="text" placeholder='Search' />
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


                }}>

                    {/* <div> */}
                    <ul style={{ listStyle: 'none', padding: '0px', justifyContent: error ? 'center' : 'start', marginBottom: "0px" }}>
                        {error && <Loader />}
                        {!error && user?.map((value) => {
                            return <li key={value.userName || value.id} onClick={() => handleChat(value.userUid)} className='userBox'>
                                <span>

                                    <p style={{
                                        fontWeight: '600',
                                        fontSize: '21px',
                                        margin: '0px',
                                    }}>{value.name}</p>
                                    <p className='username'>{value.userName}</p>
                                </span>
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
