import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import './InformationPanel.css'
import { getUserName, sendRequest } from '../../Firebase/FirestoreFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'

const AddPeoplePanel = () => {

  const [users, setUsers] = useState([])
  const [isFriend, setIsFriend] = useState(false)

  const data = useSelector((state) => state.auth);
  const fireStoreData = useSelector((state) => state.fireStore);
  console.log(fireStoreData.friends)

  
  const handleSearchFriend = (e) => {
    const currentUserName = e.target.value;
    const fetchUsers = async () => {
      try {

        const fetchedUsers = data.userDetails;

        const avalaibleUsers = fetchedUsers.filter((user) => {
          return    (user.userName === currentUserName) && (user.userName !== data.isUser.displayName)
           
          
        });
        console.log(avalaibleUsers)
        if(avalaibleUsers.length !== 0){
          const isUserFriend = fireStoreData.friends?.filter((user) => {
            return    user.userName === avalaibleUsers[0].userName
             

            })
            setIsFriend(isUserFriend.length === 0 ? false : true)
            console.log(isUserFriend)
            console.log(isFriend)
         
        }

        setUsers(avalaibleUsers)
        
      } catch (error) {
        console.log(error);
        
      }


    };
    fetchUsers()
  }
  const addFriendBtn = async ()=> {
    try {

      // console.log(data.isUser.displayName, users[0].userName)
      await sendRequest(data.isUser.displayName, users[0].userName)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='InformationPanelBoxes'>
      <h1>Add Friends</h1>
      <div className='searchBox' >
        <IoIosSearch size={30} color='#0a00bc' />

        <input onChange={handleSearchFriend} type="search" />
      </div>


      <div className='scrollable-container' style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',

        paddingBottom: '5px',
        minHeight: '220px',

      }}>

        <div>
          <ul style={{ listStyle: 'none' }}>
            {users?.map((user) => {
              return <li key={user.userUid} className='userBox'>
                <span>

                  <p style={{
                    fontWeight: '600',
                    fontSize: '21px'
                  }}>{user.name}</p>
                  <p className='username'>{user.userName}</p>
                </span>
                {!isFriend && <button onClick={addFriendBtn}>Add</button>}
                {isFriend && <p><FaCheck /></p>}

              </li>
            })}


          </ul>
        </div>

      </div>

    </div>
  )
}

export default AddPeoplePanel
