import React, { useEffect, useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import Navbar from '../Components/Navbar'
import { checkUser, createUser } from '../Firebase/AuthFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { signUpAction } from '../Actions/AuthAction'
import { demoFunc, getUserName } from '../Firebase/FirestoreFunctions'
import Loader from '../Components/Loader'
const Signup = () => {

  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [isUserNameError, setIsUserNameError] = useState(false)
  const [isAuthError, setIsAuthError] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [isTaken, setIsTaken] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.auth);

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
    setIsLoading(true);
    setIsAuthError(false)
    setIsError(false)
    setError("");
    if (isTaken) {
      return
    }

    if (!userName.trim()) {
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


      const signUpUser = await createUser(email, password, userName)
      if (signUpUser && signUpUser.uid) {

        await demoFunc(email, userName, name, signUpUser.uid)
      }
      dispatch(signUpAction(signUpUser))
    } catch (error) {
      setIsAuthError(true)
      setError(error.message)
    } finally {


      setIsLoading(false)
    }


  }

  const handleUserNameFunc = (e) => {
    const currentUserName = e.target.value;
    setUserName(currentUserName);
    const fetchUsers = async () => {
      const fetchedUsers = await getUserName();

      const validUsers = fetchedUsers.filter((user) => {
        return user.userName === currentUserName;
      });


      if (validUsers.length > 0) {
        setIsTaken(true);
      } else {
        setIsTaken(false);
      }

    };
    fetchUsers()
  }

  return (
    <>
      {isLoading && <div className='backgroundLoader'>
        <Loader />
      </div>}
      
      <div className='AuthMain'>
        <div className='AuthBox'>

          <h1>Create Account</h1>
          <form className='form' onSubmit={handleSubmit}>

            <div>

              <input onChange={handleUserNameFunc} className='input' type="text" placeholder='Username' required />
              {isUserNameError && <p>Username is required</p>}
              {isTaken && <p>Username is already taken</p>}


            </div>
            <div>

              <input onChange={(e) => setName(e.target.value)} className='input' type="text" placeholder='Name' required />
              {isError && <p>Name is required</p>}
            </div>

            <div>

              <input onChange={(e) => setEmail(e.target.value)} className='input' type="email" placeholder='Email Address' required />

            </div>
            <div>
              <div className='passIcon'>
                <input onChange={(e) => setPassword(e.target.value)} className='passInput' type={showPass ? 'text' : 'password'} placeholder='Password' required />
                {showPass && <IoEye onClick={() => setShowPass(false)} size={30} color='black' />}
                {!showPass && <IoEyeOff onClick={() => setShowPass(true)} size={30} color='black' />}
              </div>
              {isAuthError && <p>{error}</p>}
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

