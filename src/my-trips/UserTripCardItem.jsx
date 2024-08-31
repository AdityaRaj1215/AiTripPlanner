import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export  const UserTripCardItem = ({trip}) => {

     

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
    <Link to={'/viewtrip/'+trip?.id}>
    <div className='hover:scale-105 transition-all hover:shadow-md'>
      
      <img src={Photourl} alt="" className='rounded-lg h-[180px] w-full object-cover'/>
      <div className='font-bold text-lg'>{trip?.userSelection?.location?.label}</div>
      <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfdays} days trip with {trip?.userSelection?.budget} budget</h2>
    
    </div>
    </Link>
  )
}

