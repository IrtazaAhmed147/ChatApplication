import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { IoPeople } from 'react-icons/io5'
import './panel.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SidePanel = () => {

  const dataTheme = useSelector((state)=> state.fireStore)
 

  const {theme} = dataTheme


  const style = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <>
    <div className='sidePanel' style={{backgroundColor: theme === 'light' ? '#fff' : 'var(--main-dark-color)'}}>
            <ul >
                <li><Link style={style}  to='/chats'><IoPeople /></Link></li>
                <li><Link style={style} to='/settings'><IoMdSettings /></Link></li>
                <li><Link style={style} to='/findpeople'><FaSearch /></Link></li>
            </ul>
    </div>
    </>
  )
}

export default SidePanel
