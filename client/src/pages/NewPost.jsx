import React from 'react'
import { Form } from '../components/Form'

export const NewPost = ({ currentId,setCurrentId }) => {
  return (
    <div className='bg-black text-white'>
        <br />
        <br />
        <br />
        <br />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        <br />
    </div>
  )
}
