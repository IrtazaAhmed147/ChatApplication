import React from 'react'
import './Pages.css'
import AddPeoplePanel from '../Components/InformationPanel/AddPeoplePanel'
import NotificationPanel from '../Components/InformationPanel/NotificationPanel'
const FindPeoplePage = () => {
  return (
    <div className='findPeoplePageBox'>
      <AddPeoplePanel />
      <NotificationPanel />
    </div>
  )
}

export default FindPeoplePage
