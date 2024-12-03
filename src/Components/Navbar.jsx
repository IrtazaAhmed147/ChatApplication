import React from 'react'
import styles from './Navbar.module.css'
import Logo from '../Assets/talkorbitLogo.png'
const Navbar = () => {
  return (
    <div className={styles.nav}>
      
      <img src={Logo} alt="" />
    </div>
  )
}

export default Navbar
