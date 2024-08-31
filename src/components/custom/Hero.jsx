import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <div className='flex flex-col items-center gap-6 mx-56'>
     <h1 className='font font-extrabold text-[50px] text-center mt-16'>
        <span className='text-red-500'> Discover Your Next Adventure with AI :</span> Personalised itenary
        <p className='text-xl text-grey text-center pt-5'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
</p></h1>
    <Link to={'/createtrip'}>
    <Button>GET STARTED</Button>
    </Link>
     
    </div>
  )
}

