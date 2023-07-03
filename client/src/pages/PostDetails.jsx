import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../actions/posts';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deletePost,likePost } from '../actions/posts';
import RotateLoader from 'react-spinners/RotateLoader';
import { CommentSection } from '../components/CommentSection';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'


export const PostDetails = ({currentId,setCurrentId}) => {

    const user = JSON.parse(localStorage.getItem('profile'));


    const { post } = useSelector((state)=>state.posts);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const [liked,setLiked] = useState(false);


    useEffect(()=>{
        dispatch(getPost(id));
    
    },[id]);

    // console.log(post);

    if(!post) return (
        <div className='bg-black h-screen flex justify-center items-center'>
            <RotateLoader className='' color="#ffffff" />
        </div>
    );


  return (
    <div className='bg-black  flex justify-center items-center'>
        <div className='bg-transparent border-white border-2 w-[80%] text-white mt-32 h-auto pb-10 mb-10'>
            <div className='justify-center flex pt-5'>
                        {
                        user?.result?._id === post?.creator
                        &&
                        <div className='flex justify-center items-center space-x-10 py-2 text-white p-2'>
                            <div className='bg-black cursor-pointer rounded-full p-4 border border-white hover:scale-110 transition duration-500'>
                            <FiEdit2 className='' color='white' size={30} onClick={() => {setCurrentId(post._id);navigate(`/editpost`)}} />
                            </div>
                            <div className='bg-black cursor-pointer rounded-full p-4 border border-white hover:scale-110  transition duration-500'>
                            <RiDeleteBin6Line className='' color='white' size={30} onClick={()=>{dispatch(deletePost(post._id));navigate("/")}} />
                            </div>
                        </div>
                        }
                </div>
                <div className='pt-10 text-center'>
                    <h1 className='text-7xl'>{post.title}</h1>
                </div>
                <h1 className='text-right px-20 py-5 text-3xl italic'>by {post.name}</h1>
                <div className='flex justify-center items-center'>
                    <img className='rounded' src={post.selectedFile} alt='image file'/>
                </div>
                <br />
                <div>
                    <p className='text-justify p-6 px-20 text-xl'>{post.message}</p>
                </div>
                <div className='flex justify-center font-thin'>
                {
                post.tags.map((tag)=>(
                    <div key={tag} className='text-center p-1 w-auto text-xl'>
                    #{tag}
                    </div>
                ))
                }
            </div>


            <div className='flex justify-center p-7'>
                <CommentSection post={post} />
            </div>
        </div>
    </div>
  )
}
