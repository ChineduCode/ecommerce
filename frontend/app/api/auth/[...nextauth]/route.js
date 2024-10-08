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
        async jwt({ token, user, session, trigger }) {
            if (trigger === "update" && session) {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`,
                        {
                            headers: { Authorization: `Bearer ${token.accessToken}` },
                        }
                    );
            
                    const freshUser = response.data;
                    token = {
                        id: freshUser._id,
                        firstname: freshUser.firstname,
                        lastname: freshUser.lastname,
                        email: freshUser.email,
                        phone: freshUser.phone,
                        addresses: freshUser.addresses,
                        accessToken: token.accessToken,
                    };
                    
                    return token;

                } catch (error) {
                    console.error("Error refreshing user data:", error);
                    return token;
                }
            }
      
            if (user) {
                token = {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    addresses: user.addresses,
                    accessToken: user.token,
                };
            }
      
            return token;
        },
      
        async session({ session, token }) {
            session.user = {
                id: token.id,
                firstname: token.firstname,
                lastname: token.lastname,
                email: token.email,
                phone: token.phone,
                addresses: token.addresses,
            };
            
            session.accessToken = token.accessToken;
        
            return session;
        },
    },  
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
