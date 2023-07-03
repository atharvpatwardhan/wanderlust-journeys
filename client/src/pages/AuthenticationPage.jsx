import React, { useState } from 'react'
import {AiFillEye} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { signin, signup } from '../actions/user'
import { useNavigate } from 'react-router-dom'


const initialState = {
  firstName : '',
  lastName : '',
  email : '',
  password : '',
  confirmPassword : ''
}

export const AuthenticationPage = () => {

  const [formData,setFormData] = useState(initialState);

  const [isSignUp,setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();




  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if(isSignUp){
      dispatch(signup(formData));
    }
    else{
      try {
        dispatch(signin(formData));
      } catch (error) {
        alert('Invalid Credentials!')        
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }


  return (
    <div className='bg-black text-white h-screen flex flex-col justify-center items-center'>
        <br />
        <br />
        <br />
        <br />
        <form className='space-y-5 flex flex-col justify-center items-center border-white border-2 p-7 rounded-2xl' onSubmit={handleSubmit}>
          <h1 className='text-3xl'>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          {
            isSignUp
            &&
            <div className='space-y-5'>
              <div className=''>
                <h1>First Name : </h1>
                <input name='firstName' type='text' className='rounded w-80 h-8 bg-transparent border-white border-2 p-2' onChange={handleChange}></input>
              </div>
              <div className=''>
                <h1>Last Name : </h1>
                <input name='lastName' type='text' className='rounded w-80 h-8 bg-transparent border-white border-2 p-2' onChange={handleChange}></input>
              </div>
            </div>
          }
          <div className=''>
            <h1>Email : </h1>
            <input name='email' type='text' className='rounded w-80 h-8 bg-transparent border-white border-2 p-2' onChange={handleChange}></input>
          </div>
          <div className=''>
            <h1>Password : </h1>
            <div className='flex'>
              <input name='password' type={showPassword ? 'text' : 'password'} className='rounded w-80 h-8 bg-transparent border-white border-2 p-2' onChange={handleChange}></input>
              <AiFillEye className='absolute ml-[70%] sm:ml-[18.5%] p-1 cursor-pointer' onClick={toggleShowPassword} size={30} />
            </div>
          </div>
          {
            isSignUp
            &&
            <div className=''>
              <h1>Confirm Password : </h1>
              <input name='confirmPassword' type='password' className='rounded w-80 h-8 bg-transparent border-white border-2 p-2' onChange={handleChange}></input>
            </div>
          }
          <button type='submit' className='border-white border-2 p-2 rounded-xl w-20 hover:scale-90 transition duration-500'>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button className='cursor-pointer text-blue-500 underline p-5 hover:scale-95 transition duration-500' onClick={toggleSignUp}>
          {
            isSignUp?
            "Already have an account? Sign in."
            :
            "Don't have an account? Sign Up."
          }
        </button>

    </div>
  )
}
