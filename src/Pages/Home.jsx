import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../Components/Sidebar/Sidebar'

export default function Home() {
  return (
    <div className='flex bg-[#202124]'>
      <div className='w-[20%] text-white'>
        <Sidebar/>
      </div>
        <div className='w-[80%] mt-20 px-12'>
        <Outlet />
        </div>
    </div>
  )
}
