import React from 'react'
import { useState } from 'react'
import LoginNav from './LoginNav'
import dynamic from "next/dynamic"
import RegisterContext from '../context/AuthContext'
import { useContext } from 'react'
import Image from 'next/image'
// const LoginNav = dynamic(() => import('./LoginNav'), {ssr:false})

const LoginLayout = ({children}) => {
  const {errMsg } = useContext(RegisterContext)
 
  const err = <p  className='register-err' aria-live="assertive">
                    <h1>Измените пароль</h1>
                    <ol>
                        <li>Минимальная длина пароля 8 символов.</li>
                        <li>Пароль не должен быть простым. Используйте строчные и заглавные буквы. </li>
                        <li> Пароль не должен состоять только из цифр .</li>
                    </ol>
                </p> 
           

            
                

  return (
    <>
   <img className='image-background' alt='' src='/assets/background.jpg'></img>
    
    {errMsg && err}
    <div className='login-main'>
 
        <div className='login-container'>
            <h1 className='login-logo'>PollHub</h1>
            <div className='login-forms'>
             <div className='login-desc'>
                <LoginNav text="Регистрация" path="/registration" />
                <LoginNav text="Вход" path="/login" />
               
              
              </div>
              <div className='login-inputs-container'>
                 {children}
              </div>
            </div>
         
           


        </div>

    </div>
    </>
  )
}

export default LoginLayout