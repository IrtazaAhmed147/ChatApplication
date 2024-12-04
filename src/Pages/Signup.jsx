import React, { useEffect, useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import Navbar from '../Components/Navbar'
import { checkUser, createUser } from '../Firebase/AuthFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { demoUser, signUpAction } from '../Actions/AuthAction'
import { demoFunc, getUserName } from '../Firebase/FirestoreFunctions'
const Signup = () => {

  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [isUserNameError, setIsUserNameError] = useState(false)
  const [isAuthError, setIsAuthError] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.authFunc);
  // console.log(data)

  useEffect(() => {
    checkUser(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (data && data.isUser) {
      navigate('/')
    }
  }, [data, navigate])

  // useEffect( () => {
    
  // },[users]) 


  const handleSubmit = async (e) => {

    e.preventDefault()
    if (!userName.trim()) {
      console.log('adsf')
      setIsUserNameError(true)
      setIsError(false)
      return;
    } else if (!name.trim()) {
      setIsError(true)
      setIsUserNameError(false)
      return;
    }

    setIsError(false)

    try {

      console.log('uipo')

      const signUpUser = await createUser(email, password, userName)
      setIsAuthError(signUpUser)
      if (signUpUser && signUpUser.uid) {

        await demoFunc(email, userName, name, signUpUser.uid)
      }
      dispatch(signUpAction(signUpUser))
    } catch (error) {
      console.log(error)
      // setIsAuthError(error.message)
    }


  }

  const handleUserNameFunc = (e)=>{
    setUserName(e.target.value)
    const fetchUsers = async () => {
      const fetchedUsers = await getUserName();
      
      const validUsers = fetchedUsers.filter((user)=>{
        return user.userName === userName
      })
      console.log(fetchedUsers)
      console.log(validUsers)
    }
    fetchUsers()
  }

  return (
    <>
      <Navbar />
      <div className='AuthMain'>
        <div className='AuthBox'>

          <h1>Create Account</h1>
          <form className='form' onSubmit={handleSubmit}>

            <div>

              <input onChange={handleUserNameFunc} className='input' type="text" placeholder='Username' required />
              {isUserNameError && <p>Username is required</p>}
            </div>
            <div>

              <input onChange={(e) => setName(e.target.value)} className='input' type="text" placeholder='Name' required />
              {isError && <p>Name is required</p>}
            </div>

            <div>

              <input onChange={(e) => setEmail(e.target.value)} className='input' type="email" placeholder='Email Address' required />
              {/* <p>Email is required</p> */}
            </div>
            <div>
              <div className='passIcon'>
                <input onChange={(e) => setPassword(e.target.value)} className='passInput' type={showPass ? 'text' : 'password'} placeholder='Password' required />
                {showPass && <IoEye onClick={() => setShowPass(false)} size={30} color='black' />}
                {!showPass && <IoEyeOff onClick={() => setShowPass(true)} size={30} color='black' />}
              </div>
              {isAuthError && <p>{isAuthError}</p>}
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

