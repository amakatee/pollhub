import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <section className='account-layout'>
        <Navbar />
        <div className='account-main'>
        {children}

        </div>
      
    </section>
  )
}

export default Layout