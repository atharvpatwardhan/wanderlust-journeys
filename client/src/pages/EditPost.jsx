import React from 'react'
import { EditForm } from '../components/EditForm'

export const EditPost = ({currentId,setCurrentId}) => {

  return (
    <div className='bg-black text-white'>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
        <EditForm currentId={currentId} setCurrentId={setCurrentId} />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
