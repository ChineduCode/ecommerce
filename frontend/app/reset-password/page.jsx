import { Suspense } from 'react'
import NewPassword from "@/components/pages/NewPassword";

export default function NewPasswordPage(){
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <NewPassword />
        </Suspense>
    )
}
