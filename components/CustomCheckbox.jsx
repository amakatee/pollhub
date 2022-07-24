import React from 'react'
import { useContext } from 'react'
import  RegisterContext from '../context/AuthContext'



const CustomCheckbox = () => {
    const { 
        checked,
        isChecked 
        } = useContext(RegisterContext)

  return (
      <>
    <input
    className='checkbox-inp'
    type='checkbox'
    id="checkbox"
    onChange={(e) => isChecked(e.target.checked)}

    />
    {checked ? <img className='checkbox-img' src="/assets/checkbox.svg" width="10px"  alt=''></img> : <></>}
    </>
  )
}

export default CustomCheckbox