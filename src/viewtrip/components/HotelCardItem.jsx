import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const HotelCardItem = ({item}) => {

     
  const [Photourl,setPhotoUrl]=useState();
  useEffect(()=>{
    item && getPlacePhoto()
  },[item])

 const getPlacePhoto=async()=>{
    const data={
      textQuery:item?.HotelName
    }
    const result=await getPlaceDetails(data).then(resp=>{
      console.log(resp.data);
      console.log(resp.data.places[0].photos[3].name);
      const Photourl=PHOTO_REF_URL.replace('NAME',resp.data.places[0].photos[3].name)
      setPhotoUrl(Photourl);
    })
  }
  return (
    <div>
      <Link to={`https://www.google.com/maps/search/?api=1&query=`+item.HotelName } target='_blank'>
            <div className='hover:scale-110 transition-all'>
             <img src={Photourl} className='rounded-lg h-[180px] w-full object-cover' alt="" />   
             <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium'>{item.HotelName}</h2>    
            <h2 className='text-xs text-gray-500'>{item.HotelAddress}</h2>    
            <h2 className='text-sm'>{item?.Price}</h2>
            <h2 className='text-sm'>{item?.ratings}</h2>
            
                </div>  
            </div>
            </Link>
    </div>
  )
}


