import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionTypes';
import { useLocation } from 'react-router-dom';
import {FiSearch} from 'react-icons/fi'
import { getPostsBySearch,getPosts } from '../actions/posts';


export const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const [search,setSearch] = useState('');

  // console.log(user?.result)


  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    setUser(null);
    navigate("/");
  };

  const searchPost = () => {
    if(search.trim()){
      dispatch(getPostsBySearch(search));
      navigate(`/posts/search/?searchQuery=${search||'none'}`);
    }
    else{
      dispatch(getPosts());
      navigate("/posts");
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
        searchPost();
    }
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location,search]);


  return (
    <div className='text-center bg-black bg-opacity-70 text-white flex h-20 p-4 justify-center items-center space-x-10 fixed w-full border-white border-b-[1px] z-40'>
      <div className='left-5 absolute sm:text-3xl top-5 hover:scale-110 transition duration-500 cursor-pointer'>
        <h1 onClick={()=>{navigate("/");dispatch(getPosts());setSearch('')}}>Wanderlust Journeys</h1>
      </div>

      <div className='absolute sm:text-xl space-x-6 top-6 z-10 left-[30%]'>
        <button className='cursor-pointer hover:scale-110 transition duration-500' onClick={()=>{navigate("/");dispatch(getPosts());setSearch('')}}>Home</button>
        <button className='cursor-pointer hover:scale-110 transition duration-500' onClick={()=>navigate("/newpost")}>Create Post</button>
        {/* <FiSearch className='absolute top-2 left-96' />
        <input className='bg-transparent border-white border-[1px] rounded-xl p-2 h-8' type='search' placeholder='Search for a post.'></input> */}
        <div className='absolute -top-1 border-2 border-white w-80 rounded-xl left-44 flex p-1' onKeyPress={handleKeyPress}>
        <FiSearch className='my-auto cursor-pointer hover:scale-110 transition duration-500' onClick={searchPost} />
        <input className='bg-transparent p-2 h-7 outline-none'  value={search} type='search' placeholder='Search for a post.' onKeyPress={handleKeyPress} onChange={(e)=>{setSearch(e.target.value)}}></input>
        </div>
      </div>

      {
        user?.result 
        ?
        <div className='flex justify-center items-center cursor-pointer'>
          <div className=' absolute right-28 flex items-center justify-center space-x-2 hover:scale-95 transition duration-500'>
            <div onClick={()=>{navigate("/user")}}>
              <p>{user?.result.name}</p>
            </div>
            {
             !user?.result.photo
             ?
              <div className='rounded-full bg-orange-500 text-white py-2 px-4 font-semibold' onClick={()=>{navigate("/user")}}>
                <p>{user?.result.name.charAt(0)}</p>
              </div>
           :
            <div className='rounded-full  text-white py-2 px-4 font-semibold' onClick={()=>{navigate("/user")}}>
              <img className='h-12 w-12 rounded-full' src={user?.result.photo} alt='user profile'/>
            </div>
            }
          </div>
          <div className='absolute right-5 hover:scale-90 transition duration-500'>
            <button className='border-white border-2 p-2 rounded-xl' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        :
        <div className='flex justify-center items-center'>
          <h1 className='absolute right-28'>Please sign in or sign up.</h1>
          <div className='absolute right-5 border-white border-2 rounded-xl p-2 cursor-pointer hover:scale-90 transition duration-500'>
            <button onClick={()=>navigate("/login")}>Sign In</button>
          </div>
        </div>

      }
    </div>
  )
}
