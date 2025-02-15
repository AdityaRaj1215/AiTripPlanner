import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { UserTripCardItem } from './UserTripCardItem';

export const Mytrips = () => {
    const navigation=useNavigation();
    useEffect(()=>{
        getUserTrips();
    },[])
    const [userTrips,setUserTrips]=useState([])
    const getUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        console.log(user);
        
        if(!user){
            navigation('/');
            return;
        }
          /**
           * @returns
           */
            const q=query(collection(db,'AiTrips'),where('userEmail','==',user?.email))
            const querySnapshot = await getDocs(q);
            setUserTrips([]);
            querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()])
});
        
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-76 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>{userTrips.map((trip,index)=>(
        <UserTripCardItem trip={trip} />
      ))}</div>
    </div>
  )
}


