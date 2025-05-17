import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

function Header() {
  return (
    <header className='border-b border-gray-300'>
        {/* topbar */}
        <Topbar className=''/>
        {/* navbar */}
        <Navbar/>
        
        {/* card drawyer */}
    </header>
  )
}

export default Header
