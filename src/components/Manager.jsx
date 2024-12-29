import React, { useEffect, useRef, useState } from 'react'


  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref=useRef()
    const passwordRef=useRef()
const [form, setform] = useState({ site:"",username:"",password:""})
const [passwordArray, setpasswordArray] = useState([])

const getPassword=async() => {
  let req=await fetch("http://localhost:3000/")
  let passwords=await req.json()
    console.log(passwords)
      setpasswordArray(passwords)
}



useEffect(() => {
  getPassword()
    
}, [])


    const showpass=() => {
      alert("Show password")
      passwordRef.current.type="text"
      if(ref.current.src.includes("icons/shownot.png")){
        ref.current.src="icons/show.png"
      passwordRef.current.type="password"

      }
     else{
        ref.current.src="icons/shownot.png"
      passwordRef.current.type="text"

     }
    }
   
    const savePass=async() => {
      setform({ site:"",username:"",password:""})

      if(form.site.length>3 && form.username.length>3 && form.password.length>3){

        await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})

        console.log(form)
        setpasswordArray([...passwordArray,{...form,id:uuidv4()}])
        await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
        // localStorage.setItem("password",JSON.stringify([...passwordArray,{...form,id:uuidv4()}]))
        // console.log([...passwordArray,form])


        toast.success('Password Added', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          });
        
      }
      else{
        toast.warn('Fill all fields', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    }


const deletePass=async(id)=>{
  console.log("Deleting Pass "+id)
  let c=confirm("Do you really want to delete? ")
  if(c){

    toast.error('Password Deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      });


    setpasswordArray(passwordArray.filter(item=>item.id!==id))    //this will just delete temporarly
    let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})

    // localStorage.setItem("password",JSON.stringify(passwordArray.filter(item=>item.id!==id)))     //this will delete from entire local storage permanently
    // console.log([...passwordArray,form])
  }
}


const editPass=(id)=>{
  
  console.log("Editing Pass "+id)
  setform({...passwordArray.filter(item=>item.id===id)[0],id:id})    
  setpasswordArray(passwordArray.filter(item=>item.id!==id))    //this will just delete temporarly


}

    const handleChange=(e) => {
      setform({...form,[e.target.name]:e.target.value}) 
    }
    
const copyText=(text)=>{
  // alert("Copied text "+text)
  toast.info('Copied To Clipboard', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    
    theme: "dark",
    });

  navigator.clipboard.writeText(text)


}

  return (
    <>
    {/* Toast Notifications */}
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition=" Bounce"
/>
{/* Same as */}
<ToastContainer />


<div className="absolute top-0 z-[-1] h-dvh w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
<div className="container m-auto  max-w-4xl ">
<div className="cont text-4xl text-center py-4">
<span className='text-white'>&lt;
            Pass
            </span>
            <span className='text-[wheat]' >
                Guard /&gt;
                </span>
                <p className='text-stone-400 text-3xl'>Your Password Manager</p>
</div>
<div className='text-black flex flex-col p-4 mt-2  '> 
   
    <input value={form.site} name='site' onChange={handleChange} type="text" className='rounded-3xl w-full px-3 outline-none' placeholder='Enter Website URL'/>
    <div className="flex gap-4">
    <input value={form.username} name='username' onChange={handleChange} type="text" className='mt-4 rounded-3xl w-full px-3 outline-none' placeholder='Enter Username'/>
    <div className="relative">
    <input ref={passwordRef} value={form.password} name='password' onChange={handleChange} type="password" className='mt-4 rounded-3xl w-full px-3 outline-none' placeholder='Enter Password'/>
<span className='absolute right-0 top-4' >
    <img ref={ref} src="icons/show.png" alt="" width={20} className='rounded-xl mr-2 cursor-pointer' onClick={showpass}/>
    </span>
    </div>


    </div>
    <div className="button flex justify-center">
    <button  onClick={savePass} className='my-5 rounded-full bg-slate-600 px-3 py-2  flex items-center gap-2 hover:opacity-[0.8]'>
    <lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover"
   >
</lord-icon>
        Add password</button>
    
    </div>

</div>


{/* Showing passwords */}
<div className="passwords text-white grid justify-center mt-[-30px] w-fit overflow-auto mx-[-100px]">
  <h2 className='py-4 text-xl text-center'>Your Passwords</h2>
{passwordArray.length===0 && <div>No passwords to show</div>}

{passwordArray.length!=0 && <table className="table-auto w-[70vw]  rounded-md overflow-hidden  mb-10">
  <thead className='bg-cyan-950 text-[wheat] '>
    <tr>
      <th className='py-2'>Site</th>
      <th className='py-2'>Username</th>
      <th className='py-2'>Password</th>
      <th className='py-2'>Actions</th>
    </tr>
  </thead>
  <tbody className='bg-slate-900 '>
    {passwordArray.map((item,index)=>{

     return  <tr key={index} >
      <td className='py-3 w-32 text-center '><a href={item.site} target='_blank'>{item.site} </a>
      <div className='text-white inline cursor-pointer ' onClick={()=>{copyText(item.site)}}>

      <lord-icon
    src="https://cdn.lordicon.com/fkaukecx.json"
    trigger="hover"
    colors="primary:#1b1091"
   style={{"paddingTop":"10px","paddingLeft":"10px"}}>
</lord-icon>
      </div>
      </td>
      <td className='py-3 w-32 text-center'>{item.username}
      <div className='text-white inline cursor-pointer ' onClick={()=>{copyText(item.username)}}>

<lord-icon
src="https://cdn.lordicon.com/fkaukecx.json"
trigger="hover"
colors="primary:#1b1091"
style={{"paddingTop":"10px","paddingLeft":"10px"}}>
</lord-icon>
</div>
      </td>
      <td className='py-3 w-32 text-center'>{"*".repeat(item.password.length)}
      <div className='text-white inline cursor-pointer ' onClick={()=>{copyText(item.password)}}>

<lord-icon
src="https://cdn.lordicon.com/fkaukecx.json"
trigger="hover"
colors="primary:#1b1091"
style={{"paddingTop":"10px","paddingLeft":"10px"}}>
</lord-icon>
</div>
      </td>


{/* Delete */}
      <td className='py-3 w-32 text-center '>
        <span className='mx-5' onClick={()=>{deletePass(item.id)}}>
      <lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    colors="primary:#0a4e5c"
    style={{"cursor":"pointer"}}
   >
</lord-icon> 
</span>

{/* Edit */}
<span  onClick={()=>{editPass(item.id)}}>
<lord-icon
    src="https://cdn.lordicon.com/depeqmsz.json"
    trigger="hover"
    colors="primary:#0a4e5c"
    style={{"cursor":"pointer"}}>
</lord-icon>
</span>
      </td>
    </tr>
    })}
    
  </tbody>
</table>}
</div>
</div>
    </>
  )
}

export default Manager
