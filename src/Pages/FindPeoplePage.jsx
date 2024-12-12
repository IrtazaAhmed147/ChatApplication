import React from 'react'
import './Pages.css'
import AddPeoplePanel from '../Components/InformationPanel/AddPeoplePanel'
import NotificationPanel from '../Components/InformationPanel/NotificationPanel'
import SidePanel from '../Components/SidePanel/SidePanel'
const FindPeoplePage = () => {
  return (
    <>
    <SidePanel />
    <div className='findPeoplePageBox'>
      <AddPeoplePanel />
      <NotificationPanel />
    </div>
    </>
  )
}

export default FindPeoplePage
