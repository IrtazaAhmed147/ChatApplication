import React from 'react'
import { IoEye } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import './Auth.css'
import Navbar from '../Components/Navbar'

const Login = () => {
  return (
    <>
     <Navbar />
    <div className='AuthMain'>
    <div className='AuthBox'>

      <h1>Login</h1>
      <form className='form'>

      
        <div>

          <input className='input' type="email" placeholder='Email Address' required />
          {/* <p>Email is required</p> */}
        </div>
        <div>
          <div className='passIcon'>
            <input className='passInput' type="password" placeholder='Password' required />
            <IoEye size={30} color='black' />
          </div>
          {/* <p>Password is required</p> */}
        </div>

        <button className='submitBtn' type='submit'>Login</button>
      </form>
      <span className='isAccount' >Don't have an account? <Link to="/signup">Signup</Link></span>

    </div>

  </div>
    </>
  )
}

export default Login
