import React from 'react'
import { HotelCardItem } from './HotelCardItem'

export const Hotels = ({trip}) => {
  return (
    <div>
      <h2 className='font-bold text-lg mt-10'>Hotel Recomendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripdata?.hotels?.map((item,index)=>(
          <HotelCardItem item={item}/>
        ))}
      </div>
    </div>
  )
}

