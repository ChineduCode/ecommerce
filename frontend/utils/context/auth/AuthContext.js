'use client'

import { useContext, createContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext()

export const AuthProvider = ({ children })=> {
    const { data: session, status, update } = useSession()
    const [ loading, setLoading ] = useState(status === 'loading')

    useEffect(()=> {
        setLoading(status === 'loading')
    },[status])

    const login = async (email, password) => {
        await signIn('credentials', {
            email,
            password,
            redirect: false, // handle redirect manually
        });
    };

    // const updateData = (data)=> {
    //     update(data)
    // }

    const logout = () => {
        signOut({ redirect: false }); // handle redirect manually
    };

    return(
        <AuthContext.Provider value={{ session, login, loading, logout, update }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)
