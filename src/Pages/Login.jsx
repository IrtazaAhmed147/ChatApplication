import React, { useEffect, useState } from 'react'
import { IoEye } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { checkUser, loginUser } from '../Firebase/AuthFunctions'
import { signInUser } from '../Actions/AuthAction'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const data = useSelector((state) => state.authFunc);
  const navigate = useNavigate()
  console.log(data)
  useEffect(() => {
    // Check user authentication state and sync with Redux
    checkUser(dispatch);
  }, [dispatch]);

  useEffect(()=> {
    if(data && data.isUser) {
        navigate('/')
        console.log(data)
    }
  }, [data, navigate])

  const handleSubmit = async(e)=> {
    e.preventDefault()
    console.log('login')
    try {
      
      const signInUsers = await loginUser(email, password)
      console.log(signInUsers)
      dispatch(signInUser(signInUsers))
    } catch (error) {
      console.log(error.message)
    }

  }


  return (
    <>
     <Navbar />
    <div className='AuthMain'>
    <div className='AuthBox'>

      <h1>Login</h1>
      <form className='form' onSubmit={handleSubmit}>

      
        <div>

          <input className='input' onChange={(e) => setEmail(e.target.value)}  type="email" placeholder='Email Address' required />
          {/* <p>Email is required</p> */}
        </div>
        <div>
          <div className='passIcon'>
            <input className='passInput' onChange={(e) => setPassword(e.target.value)}  type="password" placeholder='Password' required />
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
