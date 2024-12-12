import React, { useEffect, useRef, useState } from 'react'
import './Auth.css'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkUser, loginUser } from '../Firebase/AuthFunctions'
import { signInUser } from '../Actions/AuthAction'
import Loader from '../Components/Loader'

const Login = () => {

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const emailText = useRef("")
  const passText = useRef("")

  const dispatch = useDispatch()
  const data = useSelector((state) => state.auth);
  console.log(data);
  
  const navigate = useNavigate()

  useEffect(() => {
    checkUser(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (data && data.isUser) {
      navigate('/')

    }
  }, [data, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailText.current
    const pass = passText.current

    setIsLoading(true);
    setIsError(false);
    setError("");
    try {

      const signInUsers = await loginUser(email, pass)

      if (signInUsers && signInUsers.user) {

        dispatch(signInUser(signInUsers))


      }
    } catch (error) {
      console.error("Login error:", error.message);
      setIsError(true);
      setError(error.message);
    }
    finally {
      setIsLoading(false)

    }

  }




  return (
    <>

      {isLoading && <div className='backgroundLoader'>
        <Loader />
      </div>}

     
      <div className='AuthMain'>
        <div className='AuthBox'>

          <h1>Login</h1>
          <form className='form' onSubmit={handleSubmit}>


            <div>

              <input className='input' onChange={(e) => emailText.current = e.target.value} type="email" placeholder='Email Address' required />

            </div>
            <div>
              <div className='passIcon'>
                <input className='passInput' onChange={(e) => passText.current = e.target.value} type={showPass ? 'text' : 'password'} placeholder='Password' required />
                {showPass && <IoEye onClick={() => setShowPass(false)} size={30} color='black' />}
                {!showPass && <IoEyeOff onClick={() => setShowPass(true)} size={30} color='black' />}
              </div>
              {isError && <p>{error}</p>}
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
