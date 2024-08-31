import React from 'react'
import { PlaceCardItem } from './PlaceCardItem'

export const PlacestoVisit = ({trip}) => {
  return (
    <div>
      <h2 className='font-bold text-lg '>Places To Visit</h2>
      <div>
        {trip?.tripdata?.itinerary.map((item,index)=>(
           
                <div>
                <h2 className='font-bold text-lg'>Day {item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                {item.plan.map((place,index)=>(
                    <div >

                        <h2 className='font-medium text-sm text-orange-300'>{place.BestTime}</h2>
                        <PlaceCardItem place={place} key={index}></PlaceCardItem>
                        
                    </div>
                ))}
            </div>
            </div>

        ))}
      </div>
    </div>
  )
}


