import React from 'react'
import { useContext } from 'react'
import RegisterContext from '../context/AuthContext'

const CustomRegButton = (back,forward) => {
    const {setCurrentStatus} = useContext(RegisterContext)
 
  return (
    <div className='role-buttons'>
      <button onClick={() => setCurrentStatus(back)} className='button-back white-fill'><h4>Назад</h4></button>
      <button onClick={() => setCurrentStatus(forward)} className='button-continue active-fill'><h4>Продолжить</h4></button>
   </div>
  )
}

export default CustomRegButton