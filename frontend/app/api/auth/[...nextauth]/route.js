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
                    // console.error('Authorization error', error.response.data.message)
                    return null
                }
            }
        })
    ],

    pages: {
        signIn: '/(user-auth)/login'
    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }){
            if(user){
                token.id = user._id,
                token.firstname = user.firstname,
                token.lastname = user.lastname,
                token.email = user.email,
                token.accessToken = user.token
            }

            return token
        },

        async session({ session, token }){
            session.user.id = token.id,
            session.user.firstname = token.firstname,
            session.user.lastname = token.lastname,
            session.user.email = token.email,
            session.accessToken = token.accessToken

            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
