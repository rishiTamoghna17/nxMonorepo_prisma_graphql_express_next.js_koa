"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

function SigningButton() {
    const{data:session} =useSession()
    if(session && session.user){
        return(
            <button className="btn-primary" onClick={()=>signOut()}>Sign Out</button>
        )
    }
  return (
    <button className="btn-primary" onClick={()=>signIn()}>Sign In</button>
  )
}

export default SigningButton