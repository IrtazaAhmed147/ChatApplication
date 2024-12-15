import React from 'react'
import SidePanel from '../Components/SidePanel/SidePanel'
import Switch from '../Components/Switch/Switch'
import { Button } from 'react-bootstrap'
import { signOutUser } from '../Firebase/AuthFunctions'
import { useNavigate } from 'react-router-dom'
import {  ref, remove } from 'firebase/database'
import { dbApp } from '../Firebase/Firebase'
import { useSelector } from 'react-redux'

const SettingPage = () => {
  
  const data = useSelector((state) => state.auth);

  const navigate = useNavigate()

   const handleLogOut = async () => {
    try {

      if(data?.isUser?.displayName) {
        const useRef = ref(dbApp, `users/${data.isUser.displayName}`)
        await remove(useRef)
      }

      await signOutUser()
      navigate('/login')

    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <>
    <SidePanel />
    <div className='settingPage'>
      <h1>Settings</h1>
      <ul>
        <li className='userBox'><p>Theme</p> <span><Switch /></span></li>
        {/* <li className='userBox'><p>Notifications</p> <span><Switch /></span></li> */}
        <li ><Button className='btn mt-3' variant='danger' onClick={handleLogOut}>Log Out</Button></li>
        
        
      </ul>
    </div>
    </>
  )
}

export default SettingPage
