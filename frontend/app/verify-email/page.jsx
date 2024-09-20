'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import Loading from "@/components/Loading"
import Link from "next/link"

export default function VerifyEmail(){
    const [loading, setLoading] = useState(true)
    const [responseMsg, setResponseMsg] = useState(null)
    const searchParams = useSearchParams()

    useEffect(()=> {
        const verifyEmail = async () => {
            try {
                const code = searchParams.get('code')
                const id = searchParams.get('id')
                if(!code || !id){
                    throw new Error('Invalid verification code')
                }

                console.log(code, id)
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/verify-email`,
                    {params: { code, id }}
                )

                if(response.data){
                    setResponseMsg(response.data)
                }
                
            } catch (error) {
                console.error(error)
                setResponseMsg(error.response ? error.response.data.message : error.message)
            } finally {
                setLoading(false)
            }
        }

        verifyEmail()

    }, [searchParams])

    if(loading) return <div style={{textAlign: 'center', padding: '2rem'}}> <Loading /> </div>

    return (
        <div className="verify-email">
            <div className="container">
                <p>{responseMsg}</p>
                <Link href={'/login'}>Login</Link>    
            </div>
        </div>
    )
}
