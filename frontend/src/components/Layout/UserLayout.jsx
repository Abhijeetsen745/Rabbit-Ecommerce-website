import React from 'react'
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className='scrollbar-none overflow-y-auto h-screen'>
      <Header/>
      {/* main content */}
      <main className="flex-1 ">
        <div className="h-full">
          <Outlet/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default UserLayout;
