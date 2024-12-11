import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import './SideBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { getFriendList, getUserName } from '../../Firebase/FirestoreFunctions';
import { isUserFriend } from '../../Actions/FireStoreAction';
import { useNavigate } from 'react-router-dom';

const FriendsList = () => {

    const data = useSelector((state) => state.auth);
    const [user, setUser] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {

        const fetchFriends = async () => {
            try {
                if (data.userDetails) {
                    const res = data.userDetails?.filter((docs) => {
                        return docs.userName === data.isUser.displayName;
                    });

                    if (res.length > 0) {
                        const friendListSnapshot = await getFriendList(res[0].id);
                        const friendData = friendListSnapshot.docs.map((d) => d.data());
                        setUser(friendData); // Correctly updates the user state.
                        dispatch(isUserFriend(friendData))
                        console.log(friendData  )
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriends();

    }, [data.isUser?.displayName, data.userDetails])

    const navigate = useNavigate()
    const handleChat = (id)=> {
        navigate(`/chat/${id}`)
    }

    return (
        <>
            <div className='searchBox'>

                <IoIosSearch size={30} color='#0a00bc' />
                <input type="text" />
            </div>
            <div className='scrollable-container' style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                overflow: 'scroll',
                overflowX: 'hidden',
                paddingBottom: '5px',
                minHeight: '490px',

            }}>

                <div>
                    <ul style={{ listStyle: 'none' }}>
                        {user?.map((value) => {
                            return <li key={value.userName || value.id} onClick={()=> handleChat(value.userUid)} className='userBox'>
                                
                                <p style={{
                                    fontWeight: '600',
                                    fontSize: '21px',
                                    margin: '0px',
                                }}>{value.name}</p>
                                 <p className='username'>{value.userName}</p>
                            </li>
                        })}

                    </ul>
                </div>

            </div>
        </>
    )
}

export default FriendsList
