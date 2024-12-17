import React, {useState} from 'react'
import './Switch.css'
import { updateTheme } from '../../Firebase/FirestoreFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { themeAction } from '../../Actions/FireStoreAction'
const Switch = (props) => {

    const data = useSelector((state)=> state.fireStore)
    console.log(data)
    const dispatch = useDispatch()


    const handleTheme = async()=> {
        console.log(props.userName)
        try {
            if(props?.userName && dispatch) {
              const theme =  await updateTheme(props.userName)            
              console.log(theme[0])
              dispatch(themeAction(theme[0].theme))
             

            }
        } catch (error) {
            throw error
        }
        console.log('theme')
      }

    //   const handleThemeChange = () => {
    //     // Toggle the theme
       
    //   };

    return (
        <>
            <label className="switch">
                <input type="checkbox" onChange={handleTheme}  checked={data.theme === 'dark' }/>
                <span className="slider"></span>
            </label>
        </>
    )
}

export default Switch
