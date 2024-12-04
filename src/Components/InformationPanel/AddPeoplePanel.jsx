import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import './InformationPanel.css'

const AddPeoplePanel = () => {
  return (
    <div className='InformationPanelBoxes'>
      <h1>Add Friends</h1>
      <div className='searchBox'>
      <IoIosSearch size={30} color='#0a00bc' />

      <input type="text"  />
      </div>
    </div>
  )
}

export default AddPeoplePanel
