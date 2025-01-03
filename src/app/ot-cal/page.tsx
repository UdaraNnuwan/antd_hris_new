"use client"
import React, { useEffect } from 'react'
import axiosInstance from '@/lib/api/axiosClient';
const OtCal=()=> {
  useEffect(() => {
    axiosInstance.post('/auth/check-time',
      {
        "checkIn":"2024-12-07 07:30:00",
        "checkOut":"2024-12-08 04:20:00"
    }
    ) // Replace with your API endpoint
      .then(response => {
       console.log("response============+>>>>>",response)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <h1>OtCal</h1>
  )
}

export default OtCal