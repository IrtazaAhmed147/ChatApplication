import React from 'react'
import SidePanel from '../Components/SidePanel/SidePanel'
import Switch from '../Components/Switch/Switch'
import { Button } from 'react-bootstrap'
import { signOutUser } from '../Firebase/AuthFunctions'
import { useNavigate } from 'react-router-dom'

const SettingPage = () => {

  const navigate = useNavigate()

   const handleLogOut = async () => {
    console.log('logout process')
    try {

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
        <li className='userBox'><p>Notifications</p> <span><Switch /></span></li>
        <li ><Button className='btn' variant='danger' onClick={handleLogOut}>Log Out</Button></li>
        
        
      </ul>
    </div>
    </>
  )
}

export default SettingPage
