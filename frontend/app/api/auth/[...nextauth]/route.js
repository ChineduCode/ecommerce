import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password'}
            },
            async authorize(credentials, req){
                try {
                    if(!credentials || !credentials?.email || !credentials?.password){
                        throw new Error('Missing email or password')
                    }
    
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`, credentials)
                    if(response.data){
                        return response.data
                    }else{
                        throw new Error('Invalid email or password')
                    }
                    
                } catch (error) {
                    console.error(error.response.data.message)
                    return null
                }
            }
        })
    ],

    pages: {
        signIn: '/login'
    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user, session, trigger }){
            if (trigger === "update" && session) {
                token = {...token, ...session}
                return token;
            };
            
            if(user){
                token.id = user._id,
                token.firstname = user.firstname,
                token.lastname = user.lastname,
                token.email = user.email,
                token.phone = user.phone,
                token.addresses = user.addresses
                token.accessToken = user.token
            }

            return token
        },

        async session({ session, token }){
            session.user.id = token.id,
            session.user.firstname = token.firstname,
            session.user.lastname = token.lastname,
            session.user.email = token.email,
            session.user.phone = token.phone,
            session.user.addresses = token.addresses,
            session.accessToken = token.accessToken

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`,{
                headers: {'Authorization': `Bearer ${token.accessToken}`}
            })
            
            const freshUser = response.data
            session.user = {
                id: freshUser._id,
                firstname: freshUser.firstname,
                lastname: freshUser.lastname,
                email: freshUser.email,
                phone: freshUser.phone,
                addresses: freshUser.addresses
            }

            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
