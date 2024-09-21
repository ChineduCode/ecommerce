import Login from "@/components/pages/Login"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function LoginPage(){
    const session = await getServerSession(authOptions)

    const params = new URLSearchParams(window.location.search)
    const callbackUrl = params.get('callbackUrl' || '/')

    if(session) redirect(callbackUrl)
    
    return(
        <Login />
    )
}
