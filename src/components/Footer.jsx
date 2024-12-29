import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className='grid items-center justify-center text-white bg-slate-900 fixed bottom-0 w-full opacity-[0.7]'>
       <div className="logo text-center text-xl ">
       <span className='text-white font-extrabold'>&lt;
            Pass
            </span>
            <span className='text-[wheat] font-extrabold' >
                Guard /&gt;
                </span>
       </div>
       <div className="txt flex justify-center items-center font-extrabold">
        Created with <img src="icons/heart2.png" alt="" width={35} className='mx-1 font-extrabold'/>  By ALOK
       </div>
      </footer>
    </div>
  )
}

export default Footer
