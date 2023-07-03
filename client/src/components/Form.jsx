import React, {useState} from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../actions/posts'
import { useNavigate } from 'react-router-dom'
import {RxCross1} from 'react-icons/rx'

export const Form = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData,setPostData] = useState({
        title : '',
        message : '',
        tags : '',
        selectedFile : ''
    })

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();

        dispatch(createPost({...postData, name: user?.result?.name }));
        navigate("/");

    }

    const clear = () =>{
        setPostData({
            title : '',
            message : '',
            tags : '',
            selectedFile : ''
        })

    }

    if(!user?.result?.name){
        return(
            <div className='bg-black text-red-600 text-2xl h-screen flex justify-center items-center'>
                <div className='border-white border-2 rounded-xl p-10'>
                <h1 className='text-3xl'>Please sign in to continue.</h1>
                </div>
            </div>
        )
    }


  return (
    <form className='m-auto w-[80%] border-2 ' autoComplete='off' noValidate onSubmit={handleSubmit}>
        <h1 className='text-center text-3xl font-semibold p-5'>Create a Post</h1>
        <div className='sm:flex justify-center items-center'>
            <div className='flex flex-col mx-auto space-y-10 text-white'>
                <div>
                <h1 className='py-2'>Title</h1>
                <input className='rounded w-80 h-10 p-2 bg-transparent border-2 border-white' name='title' placeholder='' value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}></input>
                </div>
                <div>
                <h1 className='py-2'>Message</h1>
                <textarea className='rounded w-80 h-36 p-2 bg-transparent border-2 border-white' name='message' placeholder='' value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}></textarea>
                </div>
                <div>
                <h1 className='py-2'>Tags</h1>
                <input className='rounded w-80 h-10 p-2 bg-transparent border-2 border-white' name='tags' placeholder='' value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})}></input>
                </div>
            </div>
        <div className='mx-auto'>
            {
                postData.selectedFile ? 
                <div>
                    <h1 className='py-2'>Attached Image : </h1>
                    <img src={postData.selectedFile} className='w-96' alt='post image'/>
                </div>
                :
                <div>
                    <h1 className='py-2'>Attach an Image : </h1>
                </div>

            }

            <div className='py-5 flex'>
                <FileBase
                    type = "file"
                    multiple = {false}
                    onDone = {({base64})=>setPostData({...postData, selectedFile:base64})}
                />
                {
                    postData.selectedFile
                    &&
                    <button type='reset' onClick={()=>setPostData({...postData, selectedFile:''})} className='text-white sm:absolute sm:right-72'><RxCross1 /></button>
                }
            </div>
        </div>
        </div>
        <div className='space-x-14 p-10 flex justify-center items-center'>
                <button className='p-2 border-2 rounded w-28 hover:scale-90 transition duration-500' type='submit'>Submit</button>
                <button className='p-2 border-2 rounded w-28 hover:scale-90 transition duration-500' onClick={clear}>Clear</button>
                <button className='p-2 border-2 rounded w-28 hover:scale-90 transition duration-500' onClick={()=>navigate("/")}>Cancel</button>
        </div>
    </form>
  )
}
