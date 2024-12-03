import React, { useEffect, useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoEye } from 'react-icons/io5'
import Navbar from '../Components/Navbar'
import { checkUser, createUser } from '../Firebase/AuthFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { signUpAction } from '../Actions/AuthAction'
const Signup = () => {

  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.authFunc);
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


  const handleSubmit = async (e) => {


    e.preventDefault()
    console.log('working')
    try {

      const signUpUser = await createUser(email, password, userName)
      console.log(signUpUser)
      dispatch(signUpAction(signUpUser))
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <>
      <Navbar />
      <div className='AuthMain'>
        <div className='AuthBox'>

          <h1>Create Account</h1>
          <form className='form' onSubmit={handleSubmit}>

            <input onChange={(e) => setUserName(e.target.value)} className='input' type="text" placeholder='Username' required />
            <div>

              <input onChange={(e) => setName(e.target.value)} className='input' type="text" placeholder='Name' required />
              {/* <p>Name is required</p> */}
            </div>

            <div>

              <input onChange={(e) => setEmail(e.target.value)} className='input' type="email" placeholder='Email Address' required />
              {/* <p>Email is required</p> */}
            </div>
            <div>
              <div className='passIcon'>
                <input onChange={(e) => setPassword(e.target.value)} className='passInput' type="password" placeholder='Password' required />
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
