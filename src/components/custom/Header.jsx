import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaGoogle } from "react-icons/fa6";
import axios from 'axios';


export const Header = () => {
  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog,setOpenDialog]=useState(false); 
  useEffect(()=>{
    console.log('user');
  },[])

  const login=useGoogleLogin({
    onSuccess:(coderes)=>{
      console.log(coderes)
      getUserProfile(coderes);
    },
    onError:(err)=>console.log(err)
  })

  const getUserProfile=(tokeninfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokeninfo?.access_token}`,
        Accept:`Application/json`
      }
    }).then((resp)=>{
      console.log(resp)
      localStorage.setItem('user',JSON.stringify(resp.data))
      setOpenDialog(false);
      window.location.reload();
     
    })
    
      }

  return (
    <div className='mb-5 p-2 shadow-sm flex justify-between items-end px-2 py-2'>
      <img src="/logo.svg" alt="" />
      <h2 className='font-bold text-2xl py-2'>Trip Planner </h2>
      <div > 
        {user?<div className='flex items-center gap-5'> 
          <a href='/createtrip'><Button className='rounded-full' variant='outline' >Create Trip</Button></a>
          <a href='/my-trips'><Button className='rounded-full' variant='outline' >My Trips</Button></a>
          
          <Popover>
          < PopoverTrigger><img src={user?.picture} alt="" className='h-[35px] w-[35px] rounded-full'/></PopoverTrigger>
          <PopoverContent><h2 className='cursor-pointer' onClick={()=>{
            googleLogout();
            localStorage.clear();
            window.location.reload();
          }}>
             LogOut
            </h2></PopoverContent>
          </Popover>

        </div>:    <div><Button onClick={()=>setOpenDialog(true)}>Sign in</Button></div>}

        <Dialog open={openDialog}>
  <DialogTrigger></DialogTrigger>
  <DialogContent>
    <DialogHeader>
    
      <DialogDescription>
        <img src="logo.svg" alt="" />
        <h2 className='font-bold text-lg'>Sign In with Google</h2>
        <p>Sign in to app with google authentication</p>
        <Button onClick={login} className='w-full mt-5 flex gap-4 align items-center'><FaGoogle />Sign in with Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      </div>
  
    
    </div>
  )
}


