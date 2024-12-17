import React from 'react'
import styles from './Navbar.module.css'
import Logo from '../Assets/talkorbitLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Navbar = () => {

  const dataTheme = useSelector((state)=> state.fireStore)
 

  const {theme} = dataTheme

  return (
    <div className={styles.nav} style={{backgroundColor:  theme === 'light' ? '#fff' : 'var(--main-dark-color)'}}>
      <Link to='/'>
      <img src={Logo} alt="" />
      </Link>
    </div>
  )
}

export default Navbar
