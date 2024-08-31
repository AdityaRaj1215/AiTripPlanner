import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

export const InfoSection = ({trip}) => {

   
    const [Photourl,setPhotoUrl]=useState();
    useEffect(()=>{
      trip && getPlacePhoto()
    },[trip])

   const getPlacePhoto=async()=>{
      const data={
        textQuery:trip?.userSelection?.location?.label
      }
      const result=await getPlaceDetails(data).then(resp=>{
        console.log(resp.data);
        console.log(resp.data.places[0].photos[3].name);
        const Photourl=PHOTO_REF_URL.replace('NAME',resp.data.places[0].photos[3].name)
        setPhotoUrl(Photourl);
      })
   }
  return (
    <div className='p-2'>
      <img src={Photourl} alt="img" className='sm:h-[300px] md:h-[400px] lg:h-[650px] w-full rounded-xl object-cover'/>
      <div className='flex justify-between items-center'>
      <div className='my-2 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
       <div className='flex gap-5'>
        <h2 className='p-1 px-3 text-gray-500 bg-gray-200 rounded-full text-xs md:text-md'>📆{trip?.userSelection?.noOfdays}Days</h2>
        <h2 className='p-1 px-3 text-gray-500 bg-gray-200 rounded-full text-xs md:text-md'>💰{trip?.userSelection?.budget}Budget</h2>
        <h2 className='p-1 px-3 text-gray-500 bg-gray-200 rounded-full text-xs md:text-md'>👩‍❤️‍👩No. of Travleller: {trip?.userSelection?.travellist}</h2>
      </div>
      </div>
      <Button><IoIosSend /></Button>
      </div> 
     
    </div>
  )
}

