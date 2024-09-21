import Signup from "@/components/pages/Signup";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignupPage(){
    const session = await getServerSession(authOptions)
    
    const params = new URLSearchParams(window.location.search)
    const callbackUrl = params.get('callbackUrl' || '/')

    if(session) redirect(callbackUrl)
    
    return(
        <Signup />
    )
}
