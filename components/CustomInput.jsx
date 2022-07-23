import React from 'react'
import { useContext } from 'react'
import RegisterContext from '../context/AuthContext'


const CustomInput = ({refValue, placeholderValue, setObj, id}) => {



  return (
 
    <input
    className='register-input'
    type="text"
    id={id}
    ref={refValue}
    required
  
    placeholder={placeholderValue}
    onChange={e => setObj(e.target.value)}
   

    />
   
  )
}

export default CustomInput