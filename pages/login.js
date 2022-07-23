import React, { useContext, useRef } from 'react'
import LoginLayout from '../components/LoginLayout'
import LoginNav from '../components/LoginNav'
import RegisterContext, { AuthContext } from '../context/AuthContext'
import CustomInput from '../components/CustomInput'



const Login = () => {
  const {userRef, checked, isChecked, setUser, setPwd} = useContext(RegisterContext)

  const userLoginRef = useRef()

 
    return (
      <LoginLayout>
          <form className='reg-form' onSubmit={(e) => handleSubmitLogin(e)}>
                    <input
                     className='register-input'
                    type="text"
                    id="username"
                    ref={userLoginRef}
                    required
                  
                    placeholder='E-mail'
                    onChange={e => setUser(e.target.value)}
                    

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
      </LoginLayout>
   
  )
}

export default Login