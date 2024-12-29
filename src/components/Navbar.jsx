import React from 'react'

const Navbar = () => {
  return (

      <nav className='flex justify-between bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0)) font-extrabold h-14 items-center px-10 text-3xl '>
        <div>

        <span className='text-white'>&lt;
            Pass
            </span>
            <span className='text-[wheat]' >
                Guard /&gt;
                </span>
        </div>

                <button className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-2xl py-1 px-4 mt-4 text-xl text-sky-950 flex justify-center items-center '>Login</button>
      </nav>
   
  )
}

export default Navbar
