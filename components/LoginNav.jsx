import React from 'react'
import Link from 'next//link'
import {useRouter} from 'next/router'


const LoginNav = ({path, text}) => {
    const router = useRouter()
    
  return (
    <>
    <Link href={path}>

       <p className={ router.asPath === path ? 'login-form-text login-active' : 'login-form-text' }>{text}</p>
    </Link>
    </>
  )
}

export default LoginNav