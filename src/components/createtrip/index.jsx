import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../ui/input';
import { AI_PROMT, SelectBudgetOptions } from '@/constants/options';
import { SelectTravelList } from '@/constants/options';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/Aimodel';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaGoogle } from "react-icons/fa6";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export const CreateTrip = () => {


    
  const [Place,setPlace]=useState(true);
  const [FormData,setFormData]=useState([]);
  const [openDialog,setOpenDialog]=useState(false);
  const [Loading,setLoading]=useState(false)
    const user=localStorage.getItem('user');

    const navigate=useNavigate()

    const handleInputChange=(name,value)=>{
      setFormData({...FormData,[name]:value})
    }
    const login=useGoogleLogin({
      onSuccess:(coderes)=>{
        console.log(coderes)
        getUserProfile(coderes);
      },
      onError:(err)=>console.log(err)
    })
    const onGenrateTrip=async()=>{
   
      
    if(!user){
      setOpenDialog(true);
      return;
    }

      if(FormData?.noOfdays>5 || !FormData.travellist || !FormData.budget || !FormData?.location){
       
        toast("please fill all details")
        return;

      }
      setLoading(true);
      const FINAL_PROMT=AI_PROMT.replace('{Location}',FormData?.location?.label)
    .replace('{totaldays}',FormData.noOfdays)
    .replace('{traveller}',FormData.travellist)
    .replace('{budget}',FormData.budget)
    .replace('{totaldays}',FormData.noOfdays)

     
    const result=await chatSession.sendMessage(FINAL_PROMT);
    console.log(result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text())
    }
    const saveAiTrip=async(Tripdata)=>{
      setLoading(true)
      const user=JSON.parse(localStorage.getItem('user'));
      const docId=Date.now().toString();
     await setDoc(doc(db,"AiTrips",docId),{
      userSelection:FormData,
      tripdata:JSON.parse(Tripdata),
      userEmail:user?.email,
      id:docId

     })
     setLoading(false);
     navigate('/viewtrip/'+docId);
     
    }
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
        onGenrateTrip();
      })
      
        }
    useEffect(()=>{
     console.log(FormData)
    },[FormData])

    

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-76 px-5 mt-10'>
      <h2>
      <span className='text-3xl font-bold'>Tell us your travel preferences 🏕️🌴</span>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      </h2>
      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>What is destination of choice?<br/>
        <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} selectProps={{
            Place,
            onChange:(v)=>{setPlace(v);handleInputChange('location',v)}
        }}/>
        </h2>
        <div>
            <div><h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?<br/></h2></div>
            <Input type='number' onChange={(e)=>handleInputChange('noOfdays',e.target.value)}/>
        </div>
      </div>
      <div>
      <h2 className='text-xl my-3 font-medium'>what is your Budget?<br/></h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item,index)=>(
          <div key={index} 
          onClick={()=>handleInputChange('budget',item.title)} className={`p-4 border rounded-lg hover:shadow-lg
            ${FormData?.budget===item.title && 'shadow-lg border-black'}`
          }>
          <h2 className='text-4xl'>{item.icon}</h2>
          <h2 className='font-bold text-lg'>{item.title}</h2>
          <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
        ))}
      </div>
      </div>
      <div>
      <h2 className='text-xl my-3 font-medium'>who do you want to travel with?<br/></h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravelList.map((item,index)=>(
          <div key={index} 
          onClick={()=>handleInputChange('travellist',item.people)}className={`p-4 border rounded-lg hover:shadow-lg
            ${FormData?.travellist===item.people && 'shadow-lg border-black'}`
          }>
          <h2 className='text-4xl'>{item.icon}</h2>
          <h2 className='font-bold text-lg'>{item.title}</h2>
          <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
        ))}
      </div>
      </div>
      <div className='my-10 flex justify-end'><Button disabled={Loading}onClick={()=>onGenrateTrip()}>{Loading?<AiOutlineLoading3Quarters className='w-7 h-7 animate-spin'/>:
"Genrate Trip"}</Button></div>
      <div>
      <Dialog open={openDialog}>
  <DialogTrigger>Open</DialogTrigger>
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

