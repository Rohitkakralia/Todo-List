import React from 'react'

function Navabar() {
  return (
    
      <div className=" bg-gradient-to-r from-[#15222f] to-[#3c3f43] navbar flex w-screen md:justify-evenly flex-col
       text-white min-h-10 items-center md:flex-row shadow-2xl border-b-2 border-[#343a41]">
        <div className="logo ">myTodo</div>
        <ul className='flex space-x-10'>
            <li>Home</li>
            <li>Your Tasks</li>
        </ul>
      </div>
  )
}

export default Navabar
