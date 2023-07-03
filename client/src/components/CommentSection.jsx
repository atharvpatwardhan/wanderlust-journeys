import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { commentPost } from '../actions/posts';

export const CommentSection = ({ post }) => {

    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const commentsRef = useRef();


    const handleClick = async () => {
        const finalComment = `${user.result.name} : ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });

    }

    // console.log(comments);

  return (
    <div className='bg-transparent w-[100%] text-white flex flex-col justify-center items-center px-20 pb-20'>
        <h1 className='text-3xl p-10'>Comments</h1>
        <div className='text-left w-full px-10 space-y-5'>

            {
                comments?.map((comment,i)=>(
                    <div key={i} className='text-white text-xl'>
                        {comment}
                    </div>
                ))
            }
        <div ref={commentsRef} />


        </div>
        <div className='w-[100%] p-10'>
            <h1 className='text-xl py-2'>Add a comment</h1>
            <textarea className='bg-transparent rounded-xl text-white w-full h-full border border-white p-5' value={comment} onChange={(e)=>setComment(e.target.value)} ></textarea>
            <button className='flex justify-center mx-auto text-xl border border-white rounded-xl p-2 m-2 hover:scale-90 transition duration-500' onClick={handleClick}>Submit</button>
        </div>
    </div>
  )
}
