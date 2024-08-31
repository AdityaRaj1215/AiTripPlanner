import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
export const PlaceCardItem = ({place}) => {
       
  const [Photourl,setPhotoUrl]=useState();
  useEffect(()=>{
    place && getPlacePhoto()
  },[place])

 const getPlacePhoto=async()=>{
    const data={
      textQuery:place.PlaceName
    }
    const result=await getPlaceDetails(data).then(resp=>{
      console.log(resp.data);
      console.log(resp.data.places[0].photos[3].name);
      const Photourl=PHOTO_REF_URL.replace('NAME',resp.data.places[0].photos[3].name)
      setPhotoUrl(Photourl);
    })
  }
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=`+place.PlaceName}>
    <div className='border rounded-xl p-3 mt-2 flex items-center hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={Photourl} alt="img" className='w-[130px] h-[130px] rounded-xl' />
      <div>
        <h2 className='mx-2 font-bold text-lg'>{place.PlaceName}</h2>
        <p className='mx-2 text-sm text-gray-400'>{place.PlaceDetails}</p>
        <h2 className='mx-2 mt-2'>{place.TimeTravel}</h2>
       
      </div>
    </div>
    </Link>
  )
}


