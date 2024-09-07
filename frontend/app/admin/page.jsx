import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function AdminPage(){
    const session = await getServerSession(authOptions)
    return (
        <div className="admin">Welcome {session.user.firstname}, my able Admin</div>
    )
}
