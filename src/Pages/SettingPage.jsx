import React, { useEffect } from 'react'
import SidePanel from '../Components/SidePanel/SidePanel'
import Switch from '../Components/Switch/Switch'
import { Button } from 'react-bootstrap'
import { checkUser, signOutUser } from '../Firebase/AuthFunctions'
import { useNavigate } from 'react-router-dom'
import {  ref, remove } from 'firebase/database'
import { dbApp } from '../Firebase/Firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getUserName } from '../Firebase/FirestoreFunctions'

const SettingPage = () => {
  
  const data = useSelector((state) => state.auth);
   const dataTheme = useSelector((state)=> state.fireStore)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   
   
  useEffect(() => {
      checkUser(dispatch);  
      getUserName(dispatch);
    }, [dispatch]);
    
    
      useEffect(() => {
        if (!data.isUser) {
          navigate('/login')
        
        }
        
      }, [data, navigate])
  
    const {theme} = dataTheme


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
    <div className='settingPage' style={{backgroundColor: theme === 'light' ? '#fff' : 'var(--main-dark-color)'}}>

      <h1 style={{color: theme === 'light' ? 'var(--light-text-color)' : 'var(--dark-text-color)'}}>Settings</h1>
    
      <ul>
        <li className='userBox' style={{alignItems: 'center', cursor: 'default'}}>
          <p>UserName</p>
         <p>{data?.isUser?.displayName}</p>
        </li>
        <li className='userBox' style={{alignItems: 'center', cursor: 'default'}}>
          <p>Theme</p>
          <Switch userName={data?.isUser?.displayName} />
        </li>
        {/* <li className='userBox'><p>Notifications</p> <span><Switch /></span></li> */}
        <li ><Button className='btn mt-3' variant='danger' onClick={handleLogOut}>Log Out</Button></li>
        
        
      </ul>
    </div>
    </>
  )
}

export default SettingPage
