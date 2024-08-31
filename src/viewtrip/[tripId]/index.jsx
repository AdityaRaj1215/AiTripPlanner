import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { InfoSection } from '../components/InfoSection';
import { Hotels } from '../components/Hotels';
import { PlacestoVisit } from '../components/PlacestoVisit';

export const Viewtrip = () => {

    const {tripId} = useParams();
    const [Trip,setTrip]=useState([]);

    
    useEffect(()=>{
        tripId&&getTripData();
    },[tripId])
   
    
    

    const getTripData=async()=>{
        const docRef=doc(db,"AiTrips",tripId)
        const docSnap=await getDoc(docRef)

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log('No such document')
            toast('No Trip Found')
        }
    }


  return (
    <div className='p-8 md:p-14 lg:p-18 xl:p-22'>
        
    <InfoSection trip={Trip}/>
    <Hotels trip={Trip}/>
    <PlacestoVisit trip={Trip}/>
    </div>
  )
}

