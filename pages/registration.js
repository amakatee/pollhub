import React from 'react'
import { useRef, useState, useEffect } from 'react'
import LoginLayout from '../components/LoginLayout'
import { useContext } from 'react'
import RegisterContext from '../context/AuthContext'
import {AuthContext} from '../context/AuthContext'
import axios from './api/axios'

const PHONE_CODE = 1234
const REGISTER_URL = '/auth/jwt/create/'
const PHONE_REGEX = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
const Registration = () => {
    const { userRef, user, setUser, validName,setValidName, userFocus, setUserFocus, pwd, setPwd, 
    validPwd, setValidPwd, pwdFocus, setPwdFocus, checked, isChecked, errMsg, setErrMsg } = useContext(RegisterContext)
    

    let status 
    const userOptRef = useRef()
    const creatorOptRef = useRef()
    const options =  [userOptRef.current, creatorOptRef.current]
 

    const [phone, setPhone] = useState('')
    const [currentStatus,  setCurrentStatus] = useState('EmailPwd')
   

    const [userCurrentStatus, setUserCurrentStatus] = useState('user')
    const [statusChecked, setStatusChecked] = useState("false")

    

    const registerForm = <form className='reg-form' onSubmit={(e) => handleSubmit(e)}>
    <input
     className='register-input'
    type="text"
    id="username"
    ref={userRef}
    required
  
    placeholder='E-mail'
    onChange={e => setUser(e.target.value)}
    onFocus={() => setUserFocus(true)}
    onBlur={() => setUserFocus(false)}

    >
    </input>

    <input
    className='register-input '
    type="text"
    id="password"
    ref={userRef}
    required
   
    placeholder='Пароль'
    onChange={e => setPassword(e)}
    onFocus={() => setPwdFocus(true)}
    onBlur={() => setPwdFocus(false)}

    >
    </input>

   
    <div className='checkbox-line'>
    <div className='checkbox-cont'>
    
    <input
    className='checkbox-inp'
    type='checkbox'
    id="checkbox"
    onChange={(e) => isChecked(e.target.checked)}

    />
    {checked ? <img src="/assets/checkbox.svg" width="10px"></img> : <></>}
    </div>
    
    <label htmlFor='checkbox'>
   
    Согласие на обработку персональных данных
    
    </label>
    </div>
  
   

    <button disabled={!validPwd} className='register-button'>Продолжить</button>

    </form>

    const phoneForm =  <section className='phone-submit'> 
           <p>Укажите свой номер телефона</p>
                <form className='reg-form' onSubmit={(e) => handleSubmitPhone(e)}>
                    <input
                     className='register-input'
                    type="tel"
                    name='phone'
                    id="phone"
                    ref={userRef}
                    required
                    placeholder='+7'
                    // pattern='[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}'
                    onChange={e => setPhone(e.target.value)}
                   />
                    <button className='register-button'>Продолжить</button>
                </form>
    </section>   
 

    const chooseRole = <section  className='choose-role display-column'>
        <p className='main-p-text'>Выберите свою роль</p>
        <ul  className='roles display-column'>
            <li  className='role-option  active-fill'>
                <label>
                  <input  ref={userOptRef} onChange={(e) => handleStatusChange(e,options) } name="role-opt" type='radio' className='input-opt' value='user' />
                  <h4>Пользователь</h4>
                  <p>Решай тесты и получи больше баллов!</p>
                </label>
            </li>
            <li  className='role-option white-fill'>
                <label>
                 <input ref={creatorOptRef} onChange={(e) => handleStatusChange(e, options)} type='radio' name="role-opt" className='input-opt' value='creator' />
                  <h4>Создатель</h4>
                  <p>Создавай, редактируй и проходи тесты сам!</p>
                </label>
            </li>
        </ul>
        <div className='role-buttons'>
            <button onClick={() => setCurrentStatus('EmailPwd')} className='button-back white-fill'><h4>Назад</h4></button>
            <button className='button-continue active-fill'><h4>Продолжить</h4></button>
        </div>


    </section>

  options.forEach(option => {
      console.log(option)
  })

   function handleStatusChange(e, options){
       const role = e.target
       const parent = e.target.parentElement.parentElement
       setUserCurrentStatus(e.target.value)
       
    // if(role.checked) {
    //     parent.classList.add('active-fill')
    //     parent.classList.remove('white-fill')
    // } else if (!role.checked) {
    //     parent.classList.remove('active-fill')
    //     parent.classList.add('white-fill')

    // }
   


   }

   async function handleSubmit(e){
        e.preventDefault()
        if(!checked) return 
        
        try {
                const response = await axios.post(REGISTER_URL,
                  JSON.stringify({username:user, password:pwd}),
                  {
                      headers: {'Content-Type': 'application/json'},
                      withCredentials: true,
                  })
            console.log(response.data)
        } catch(err){
          console.log(err.message)
          setCurrentStatus('Role')
        }
    }

    function currentPage (status = currentStatus) {
        switch (status) {
            case 'EmailPwd':
                return registerForm
                break
            // case 'Phone': 
            //     return phoneForm   
            //     break 
            case 'Role':
                return chooseRole
                break 
            default:
                return registerForm    
    
        }
    } 

    function setPassword(e) {
        e.preventDefault()
        setPwd(e.target.value)
        validatePassword(e)

    }
    
    function validatePassword(obj) {  
        if(!validPwd){
            console.log(obj)
            obj.target.classList.add('pwd-err')
            obj.target.parentElement.lastChild.classList.add('err-button')
            setErrMsg(true) 
        }else {
            obj.target.classList.remove('pwd-err')
            obj.target.parentElement.lastChild.classList.remove('err-button')
            setErrMsg(false)

        }
    }

  


  
  return (
    <>
    <LoginLayout>
        {currentPage(status)}
    </LoginLayout>
    </>
  
  )
}

export default Registration