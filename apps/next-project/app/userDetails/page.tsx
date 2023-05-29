"use client"
import React, { useEffect } from 'react'

function page() {
  useEffect(() => {
    if (!localStorage.getItem('authToken'))
      return (window.location.href = '/login');
  }, []);
  return (
    <div>page</div>
  )
}

export default page