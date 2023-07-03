import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Post } from '../components/Post';
import RotateLoader from "react-spinners/RotateLoader";

export const Posts = ({currentId, setCurrentId}) => {

    // const [posts,setPosts] = useState(useSelector((state)=>state.posts));
    // const [deleteId,setDeleteId] = useState(null);

    const {posts} = useSelector((state)=>state.posts);
    // posts.filter((post)=>post._id !== deleteId);
    // const user = JSON.parse(localStorage.getItem('profile'));





  return (
    !posts.length
     ? 
     <div className='bg-black h-screen flex justify-center items-center'>
        <RotateLoader className='' color="#ffffff" />
    </div>
    :
    <div className='flex flex-wrap justify-center items-center py-20 bg-black space-x-10'>
        {
            posts.map((post)=>(
                <div className='p-5' key={post._id}>
                    <Post key={post._id} post={post} currentId={currentId} setCurrentId={setCurrentId}  />
                </div>
            ))
        }
    </div>
  )
}
