import { createContext, useRef, useState, useEffect } from "react";

const RegisterContext = createContext()

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!./\}#$%]).{8,}$/;

export const AuthContext = ({children}) => {
   const userRef = useRef()
   
   
    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)


    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

 
   
    const [errMsg, setErrMsg] = useState(false)
    const [success, setSuccess] = useState(false)

    const [checked, isChecked] = useState(false)
  
    useEffect(() => {
        // userRef.current.focus()
   
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(user)
        setValidName(result)

    },[user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        
     
        setValidPwd(result)
       
    }, [pwd])

    return <RegisterContext.Provider
    value={{
        userRef, 
        user, 
        setUser, 
        validName,
        setValidName, 
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
        setErrMsg
    }}
    >
        {children}

    </RegisterContext.Provider>
}

export default RegisterContext