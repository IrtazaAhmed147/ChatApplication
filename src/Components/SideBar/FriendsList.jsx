import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import './SideBar.css'
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendList, getUserName } from '../../Firebase/FirestoreFunctions';

const FriendsList = () => {

    const data = useSelector((state) => state.auth);
    console.log(data)
    const [user, setUser] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {

        console.log('working')
    //    const res = []
    try {
        if (data.userDetails) {
          const res = data.userDetails.filter((docs) => {
            return docs.userName === data.isUser.displayName;
          });
  
          if (res.length > 0) {
            getFriendList(res[0].id)
              .then((doc) => setUser(doc.docs.map((d) => d.data())))
              .catch((e) => console.log(e));
              console.log(user)
          }
        }
      } catch (error) {
        console.log(error);
      }

    }, [data.isUser.displayName, data.userDetails])

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
                    {user?.map((value)=> {
                        return <li key={value.userName || value.id}>
                            {value.userName}
                        </li>
                    })}

                    </ul>
                </div>

            </div>
        </>
    )
}

export default FriendsList
