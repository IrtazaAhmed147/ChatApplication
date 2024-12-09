import React from 'react'
import { IoIosSearch } from "react-icons/io";
import './SideBar.css'
import List from './List';

const FriendsList = () => {
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
                       
                      
                    </ul>
                </div>

            </div>
        </>
    )
}

export default FriendsList
