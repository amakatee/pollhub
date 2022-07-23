import React from 'react'
import { useRef, useState, useEffect } from 'react'
import LoginLayout from '../components/LoginLayout'
import { useContext } from 'react'
import RegisterContext from '../context/AuthContext'
import {AuthContext} from '../context/AuthContext'
import axios from './api/axios'
import CustomInput from '../components/CustomInput'
import CustomCheckbox from '../components/CustomCheckbox'
import CustomRegButton from '../components/customRegButton'



const PHONE_REGEX = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
const Registration = () => {
    const { userRef,
            setUser,
            setUserFocus,
            validPwd, 
            handleSubmit, 
            setPwdFocus, 
            checked:reg, 
            isChecked, 
            currentStatus,
            setCurrentStatus, 
            roles, 
            userCurrentStatus,
            handleStatusChange,
            setPassword,
            setName,
            setFamilyName,
            submitRegistration,
            setPwd
        } = useContext(RegisterContext)
    

    let status 

    const registerForm = <form className='reg-form' onSubmit={(e) => handleSubmit(e)}>
    
    <CustomInput placeholderValue='E-mail' setObj={setUser} refValue={userRef} id='username'/>    <input
    className='register-input'
    type='text'
    placeholder='Пароль'
    onChange={(e) => setPassword(e)}
    ref={userRef}
    id="password"
    >
    </input>

  

    <div className='checkbox-line'>
    <div className='checkbox-cont'>

    <CustomCheckbox />
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
        <div  className='roles display-column'>
           { roles.map((role,i) => (
             <label>
               <div key={role.id} className={role.status === userCurrentStatus ? 'role-option  active-fill' : 'role-option'}>
                 <input  onChange={(e) => handleStatusChange(e) } name="role-opt" type='radio' className='input-opt' value={role.status} />
                 <h4>{role.userOption}</h4>
                 <p>{role.description}</p>
                </div>
             </label>

           ))}
          
        </div>
        <div className='role-buttons'>
            <button onClick={() => setCurrentStatus('EmailPwd')} className='button-back white-fill'><h4>Назад</h4></button>
            <button onClick={() => setCurrentStatus('NameData')} className='button-continue active-fill'><h4>Продолжить</h4></button>
        </div>


    </section>

    const nameData = <form className='reg-form' onSubmit={(e) => submitRegistration(e)}>
       
        <CustomInput placeholderValue='Имя' setObj={setName} refValue={userRef} id="name"/>
        <CustomInput placeholderValue='Фамилия' setObj={setFamilyName} refValue={userRef} id="familyName" />
        <div className='role-buttons'>
          <button onClick={() => setCurrentStatus('Role')} className='button-back white-fill'><h4>Назад</h4></button>
          <button type='submit' className='button-continue active-fill'><h4>Продолжить</h4></button>
        </div>

      
    </form>
    
  
   

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
            case 'NameData': 
                return nameData   
                break  
            default:
                return registerForm    
    
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