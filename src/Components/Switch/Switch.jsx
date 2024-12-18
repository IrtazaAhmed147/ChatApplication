import React from 'react'
import './Switch.css'
import { updateTheme } from '../../Firebase/FirestoreFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { themeAction } from '../../Actions/FireStoreAction'
const Switch = (props) => {

    const data = useSelector((state)=> state.fireStore)

    const dispatch = useDispatch()


    const handleTheme = async()=> {
        try {
            if(props?.userName && dispatch) {
              const theme =  await updateTheme(props.userName)            
             
              dispatch(themeAction(theme[0].theme))
             

            }
        } catch (error) {
            throw error
        }
      }

    
    return (
        <>
        <div className="toggle-switch">
            <label className="switch-label">
               
                <input type="checkbox" onChange={handleTheme} checked={data.theme === 'light' } className="checkbox" />
                <span className="slider"></span>
            </label>
            </div>
        </>
    )
}

export default Switch
