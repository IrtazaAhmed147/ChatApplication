import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { IoPeople } from 'react-icons/io5'
import './panel.css'
import { Link } from 'react-router-dom'

const SidePanel = () => {
  return (
    <>
    <div className='sidePanel'>
            <ul >
                <li><Link to='/chats'><IoPeople /></Link></li>
                <li><Link to='/settings'><IoMdSettings /></Link></li>
                <li><Link to='/findpeople'><FaSearch /></Link></li>
            </ul>
    </div>
    </>
  )
}

export default SidePanel
