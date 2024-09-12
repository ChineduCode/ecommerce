import Login from "@/components/pages/Login"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Suspense } from 'react'
import Loading from "@/components/Loading"

export default async function LoginPage(){
    // const session = await getServerSession(authOptions)
    // if(session) redirect('/')
    
    return(
        <Suspense fallback={<Loading />}>
            <Login />
        </Suspense> 
    )
}
