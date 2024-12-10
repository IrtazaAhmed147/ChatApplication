import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import './InformationPanel.css'
import { getUserName, sendRequest } from '../../Firebase/FirestoreFunctions'
import { useDispatch, useSelector } from 'react-redux'

const AddPeoplePanel = () => {

  const [users, setUsers] = useState([])

  const data = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const handleSearchFriend = (e) => {
    const currentUserName = e.target.value;
    const fetchUsers = async () => {
      try {

        const fetchedUsers = data.userDetails;

        const avalaibleUsers = fetchedUsers.filter((user) => {
          return    (user.userName === currentUserName) && (user.userName !== data.isUser.displayName)
           
          
        });
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
                <button onClick={addFriendBtn}>Add</button>

              </li>
            })}


          </ul>
        </div>

      </div>

    </div>
  )
}

export default AddPeoplePanel
