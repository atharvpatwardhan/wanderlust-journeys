import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import { updateUser } from '../actions/user';
import { useNavigate } from 'react-router-dom';


export const ProfilePage = ({user}) => {

    // const currentUser = useSelector((state)=> user ? state.user.find((p)=> p._id === user?.result?._id) : null);


    // const user = JSON.parse(localStorage.getItem('profile'));

    // console.log(user?.result?._id);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(updateUser(user?.result?._id,{...currentUser}));
        navigate("/login");
    }
    // console.log(currentUser);

    // setUserId(user?.result?._id);

    const [currentUser,setCurrentUser] = useState({
        name: user?.result?.name,
        email: user?.result?.email,
        photo: user?.result?.photo
    })

  return (
    <div className='h-screen flex justify-center items-center bg-black text-white space-x-20'>
        <div className=''>
            <h1 className='text-7xl'>{user?.result?.name}</h1>
            <p className='text-5xl'>{user?.result?.email}</p>
            {/* <p>{userr?.name}</p> */}
        </div>
        <div className='flex flex-col'>
        {
            currentUser.photo
            ?
            <div>
                <img className='h-96 w-96 rounded-full p-5' src={currentUser.photo} alt='image' />
            </div>
            :
            <div>
                <br />
                <br />
                <div className='rounded-full bg-orange-500 text-9xl py-32 text-center'>
                {user?.result?.name[0]}
                </div>
            </div>

        }
                <h1 className='text-xl py-2'>Change Profile Photo:</h1>
                <FileBase
                    type = "file"
                    multiple = {false}
                    onDone = {({base64})=>setCurrentUser({...currentUser,photo:base64})}
                />
                <p className='text-red-500 py-2'>Note: Changing photo will require you to sign in again.</p>

                <br />
        <button className='border-white border-2 rounded-xl p-2' onClick={handleClick}>Submit</button>
        </div>

    </div>
  )
}
