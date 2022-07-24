import { createContext, useRef, useState, useEffect } from "react";
import axios from "../pages/api/axios";


const RegisterContext = createContext()

const REGISTER_URL = '/auth/users/'
const JWT_TOKEN_URL = '/auth/jwt/create/'

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!./\}#$%]).{8,}$/;

export const AuthContext = ({children}) => {
   const userRef = useRef()

   const roles =  [ 
    {
        id: "0",
        status: 'user',
        userOption: 'Пользователь',
        description: 'Решай тесты и получи больше баллов!'
    },
    {
        id: "1",
        status: 'creator',
        userOption: 'Создатель',
        description: 'Создавай, редактируй и проходи тесты сам!'
 }  
]
   //Статус страницы регитсрации:
   // 'EmailPwd': поле с вводом пароля и эмэйла при регистрации
   // 'Phone': ввод номера телефона
   // 'Role': выбор роли пользователь / создатель
   // 'NameData': поле с вводом Имени и Фамилии
   const [currentStatus,  setCurrentStatus] = useState('EmailPwd')
   
   


    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)


    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [userCurrentStatus, setUserCurrentStatus] = useState('user')

    const [name, setName] = useState('')

    const [familyName, setFamilyName] = useState('')
    
    const [errMsg, setErrMsg] = useState(false)
   
    const [checked, isChecked] = useState(false)
  


    useEffect(() => {
        const result = EMAIL_REGEX.test(user)
        setValidName(result)

    },[user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
         setValidPwd(result)
       
    }, [pwd])


    const requestHeaders = 
    {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    }
    


    async function submitRegistration(e){
        e.preventDefault()
        try {
            const response = await axios.post(REGISTER_URL,
              JSON.stringify({username:user, password:pwd, first_name:name, last_name:familyName}),requestHeaders)

              const tokens  = await axios.post(JWT_TOKEN_URL,
                JSON.stringify({username:user, password:pwd}),requestHeaders)
           
         
            const data = response?.data    
            console.log(tokens?.data)

        console.log(response)
       
        
        } catch(err){
         console.log(err.message)
      
        } 
    }

    
    // async function submitRegistration(e){
    //     e.preventDefault()
    //     try {
    //         const response = await axios.post(REGISTER_URL,
    //           JSON.stringify({username:user, password:pwd, first_name:name, last_name:familyName}),
    //           {
    //               headers: {'Content-Type': 'application/json'},
    //               withCredentials: true,
    //           })
           
         
    //         const acc = response?.data.refreshToken    

          

            
    //     console.log(response)
    //     console.log(acc)
        
    //     } catch(err){
    //      console.log(err.message)
      
    //     } 
    // }

   
    function handleSubmit(e){
        e.preventDefault()
        if(!checked) return 
        setCurrentStatus('Role')
       
    }



     // При нажатии на кнопку выбирает статус пользователя создатель/пользователь
    function handleStatusChange(e){
        setUserCurrentStatus(e.target.value)
 }

    //Сохраняет пароль при регитрации
    function setPassword(e) {
        e.preventDefault()
        setPwd(e.target.value)
        validatePassword(e)

    }
    
    function validatePassword(obj) {  
        if(!validPwd){
            obj.target.classList.add('pwd-err')
            obj.target.parentElement.lastChild.classList.add('err-button')
            setErrMsg(true) 
        }else {
            obj.target.classList.remove('pwd-err')
            obj.target.parentElement.lastChild.classList.remove('err-button')
            setErrMsg(false)

        }
    }

    return <RegisterContext.Provider
    value={{
        userRef, 
        user, 
        setUser, 
        validName,
        setValidName,
        handleSubmit, 
        userFocus, 
        setUserFocus, 
        pwd, 
        setPwd, 
        validPwd, 
        setValidPwd, 
        pwdFocus, 
        setPwdFocus, 
        checked, 
        isChecked,
        errMsg,
        setErrMsg,
        currentStatus,  
        setCurrentStatus,
        roles,
        userCurrentStatus,
        setUserCurrentStatus,
        setPassword,
        handleStatusChange,
        setName,
        setFamilyName,
        submitRegistration,
    }}
    >
        {children}

    </RegisterContext.Provider>
}

export default RegisterContext