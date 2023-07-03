import React, {useEffect, useState} from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../actions/posts'
import { useNavigate } from 'react-router-dom'

export const EditForm = ({currentId,setCurrentId}) => {

    const post = useSelector((state)=> currentId ? state.posts.posts.find((p)=> p._id === currentId) : null);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));

    
    useEffect(() => {
        if(post) setPostData(post);
    },[post])

    const [postData,setPostData] = useState({
        title : post.title,
        message : post.message,
        tags : post.tags,
        selectedFile : post.selectedFile
    })

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(updatePost(currentId,{...postData, name: user?.result?.name}));
        setCurrentId(null);
        clear();
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
    <div>

    {
    post 
    ? 
    <form className='m-auto w-[80%] border-2 ' autoComplete='off' noValidate onSubmit={handleSubmit}>
        <h1 className='text-center text-3xl font-semibold p-5'>Edit Post</h1>
        <div className='sm:flex justify-center items-center'>
            <div className='flex flex-col mx-auto space-y-10'>
                <div>
                <h1 className='py-2'>Title</h1>
                <input className='rounded w-80 h-10 p-2 border-2 text-black' name='title' placeholder='Title' value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}></input>
                </div>
                <div>
                <h1 className='py-2'>Message</h1>
                <input className='rounded w-80 h-10 p-2 border-2 text-black' name='message' placeholder='Message' value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}></input>
                </div>
                <div>
                <h1 className='py-2'>Tags</h1>
                <input className='rounded w-80 h-10 p-2 border-2 text-black' name='tags' placeholder='Tags' value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})}></input>
                </div>
            </div>
        <div className='mx-auto'>
            <h1 className='py-2'>Attached Image : </h1>
            <img src={postData.selectedFile} className='w-96' alt='post image'/>
            <div className='py-5'>
                <FileBase
                    type = "file"
                    multiple = {false}
                    onDone = {({base64})=>setPostData({...postData, selectedFile:base64})}
                />
            </div>
        </div>
        </div>
        <div className='space-x-14 p-10 flex justify-center items-center'>
                <button className='p-2 border-2 rounded w-28 hover:scale-90 transition duration-500' type='submit'>Submit</button>
                <button className='p-2 border-2 rounded w-28 hover:scale-90 transition duration-500' onClick={clear}>Clear</button>
                <button className='p-2 border-2 rounded w-28 hover:scale-90 transition duration-500' onClick={()=>navigate("/")}>Cancel</button>
        </div>
    </form>
    :
    <div>
        Loading Form...
    </div>
    }

    </div>
  )
  
}
