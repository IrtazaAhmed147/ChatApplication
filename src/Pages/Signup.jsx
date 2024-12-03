import React from 'react'
import './Auth.css'
import { Link } from 'react-router-dom'
import { IoEye } from 'react-icons/io5'
import Navbar from '../Components/Navbar'
const Signup = () => {


  return (
    <>
    <Navbar />
    <div className='AuthMain'>
      <div className='AuthBox'>

        <h1>Create Account</h1>
        <form className='form'>

          <input className='input' type="text" placeholder='Username' required />
          <div>

            <input className='input' type="text" placeholder='Name' required />
            {/* <p>Name is required</p> */}
          </div>

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

          <button className='submitBtn' type='submit'>Create Account</button>
        </form>
        <span className='isAccount' >Already have an account? <Link to="/login">Login</Link></span>

      </div>

    </div>
    </>
  )
}

export default Signup
