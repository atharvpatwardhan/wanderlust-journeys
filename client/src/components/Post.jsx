import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likePost } from '../actions/posts';
import {LiaCommentDots} from 'react-icons/lia'

export const Post = ({ post, currentId, setCurrentId }) => {

  const user = JSON.parse(localStorage.getItem('profile'));

  const [liked,setLiked] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const isLiked = post.likes.find((like)=>like===user?.result?._id)


  
  useEffect(()=>{

    if(isLiked){
      setLiked(true);
    }

  },[currentId])

  const postDetails = () => {
    navigate(`/posts/${post._id}`);
  }

      {/* {
        user?.result?._id === post?.creator
        &&
        <div className='flex justify-end items-center space-x-2 py-2 absolute text-white p-2'>
          <div className='bg-black rounded-full p-2'>
          <FiEdit2 className='hover:scale-125 cursor-pointer transition duration-500' onClick={() => {setCurrentId(post._id);navigate(`/editpost`)}} />
          </div>
          <div className='bg-black rounded-full p-2'>
          <RiDeleteBin7Line className='hover:scale-125 cursor-pointer transition duration-500' onClick={()=>{dispatch(deletePost(post._id))}} />
          </div>
        </div>
      } */}


  return (
    <div className='rounded shadow-white shadow-sm m-5 text-white w-[95%] cursor-pointer hover:scale-105 transition duration-500' onClick={postDetails}>
        <img src={post.selectedFile} className='h-96 rounded-t w-full' alt='post image' />
        <div className='p-2 shadow-white shadow-sm border-t-0 rounded-b'>
          <h1 className='text-2xl font-semibold p-1'>{post.title}</h1>
          <p className={`text-xl px-1`}>by <span className={`${user?.result?._id === post?.creator ? "text-blue-500" : ""}`}>{post.name}</span></p>
          <p className='px-1 font-light'>{moment(post.createdAt).fromNow()}</p>
          {/* <p className='text-center py-2 w-52 mx-auto h-28 overflow-hidden'>{post.message}</p> */}
          <div className='flex justify-center font-thin'>
            {
              post.tags.map((tag)=>(
                <div key={tag} className='text-center p-1 text-sm w-auto rounded-2xl'>
                  #{tag}
                </div>
              ))
            }
          </div>
          <div className='flex justify-center items-center space-x-10 p-3'>
            <p className='flex items-center justify-center space-x-1' onClick={()=>setLiked(!liked)} aria-disabled={!user?.result}>
              {
                liked && user?.result
                ?
                <AiFillHeart color='red' aria-disabled={!user?.result} className='hover:scale-110 hover:text-red-600 cursor-pointer transition duration-500' size={25} onClick={(e)=>{e.stopPropagation();setLiked(!liked);dispatch(likePost(post._id))}} />
                :
                <AiOutlineHeart className='hover:scale-110 hover:text-red-600 cursor-pointer transition duration-500' aria-disabled={!user?.result} size={25} onClick={(e)=>{e.stopPropagation();setLiked(!liked);dispatch(likePost(post._id))}} />
              }
              
              {post.likes.length}
            </p>
            <p className='flex items-center justify-center space-x-1'>
              <LiaCommentDots size={25} />
              {post.comments.length}
            </p>
          </div>

    
        </div>
    </div>
  )
}
