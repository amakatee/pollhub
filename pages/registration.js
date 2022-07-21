import React from 'react'
import { useRef, useState, useEffect } from 'react'
import LoginLayout from '../components/LoginLayout'
import { useContext } from 'react'
import RegisterContext from '../context/AuthContext'
import {AuthContext} from '../context/AuthContext'
import axios from './api/axios'


const REGISTER_URL = '/auth/jwt/create/'
const PHONE_REGEX = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
const Registration = () => {
    const { userRef, user, setUser, validName,setValidName, userFocus, setUserFocus, pwd, setPwd, 
    validPwd, setValidPwd, pwdFocus, setPwdFocus, checked, isChecked, errMsg, setErrMsg } = useContext(RegisterContext)
    
    const [phone, setPhone] = useState('')

    const [successEmail,  setSuccessEmail] = useState(false)
    
    

    async function handleSubmit(e){
        e.preventDefault()
        if(!checked) return 
        if(!validPwd){
            e.target.children[1].classList.add('pwd-err')
            e.target.children[3].classList.add('err-button')
            setErrMsg(true)
            

         
        }else{ 
            e.target.children[1].classList.remove('pwd-err')
            e.target.children[3].classList.remove('err-button')
            setErrMsg(false)
          
            try {
                const response = await axios.post(REGISTER_URL,
                  JSON.stringify({username:user, password:pwd}),
                  {
                      headers: {'Content-Type': 'application/json'},
                      withCredentials: true,
                     
                      
    
    
                  })
            console.log(response.data)
    
            } catch(err){
    
            }
            setSuccessEmail(true)
        }

        
      
    }
  return (
    <>
      {!successEmail ?
      <LoginLayout>
       

      

                <form className='reg-form' onSubmit={(e) => handleSubmit(e)}>
                    <input
                     className='register-input'
                    type="text"
                    id="username"
                    ref={userRef}
                    required
                  
                    placeholder='E-mail'
                    onChange={e => setUser(e.target.value)}
                    // aria-invalid={validName ? "false" : "true"}
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
                    onChange={e => setPwd(e.target.value)}
                    // aria-invalid={validPwd ? "false" : "true"}
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
                  
                   

                    <button className='register-button'>Продолжить</button>

                </form>
           
      </LoginLayout> :
       <LoginLayout>
           <div className='phone-submit'> 
            
                <p>Укажите свой номер телефона</p>
                <form className='reg-form' onSubmit={(e) => handleSubmit(e)}>
                    <input
                     className='register-input'
                    type="tel"
            
                    name='phone'
                    id="phone"
                    ref={userRef}
                    required
                    placeholder='+7'
                    pattern='[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}'

                    
                    onChange={e => setPhone(e.target.value)}
                  
                   

                    />
               

                   
                   
                  
                   

                    <button disabled={true} className='register-button'>Продолжить</button>

                </form>
            </div>   
       
      </LoginLayout>
      }
      </>
  
  )
}

export default Registration