import firebase, { initializeApp } from 'firebase/app'
import 'firebase/auth'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { createContext, FC, ReactNode } from 'react'

const firebaseConfig = {
    apiKey: "AIzaSyDhklymno8Z4Ir35vm-cTX9iYmvgWgSP_0",
    authDomain: "financedashboard-d45a7.firebaseapp.com",
    databaseURL: "https://financedashboard-d45a7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "financedashboard-d45a7",
    storageBucket: "financedashboard-d45a7.appspot.com",
    messagingSenderId: "1032321724483",
    appId: "1:1032321724483:web:e10eb6e9a7c6ed2b87e4f6"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

interface AuthContextProps {
    user: User | null,
    signUp: (email: string, password: string) => Promise<void>,
    signIn: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
}

const Context = createContext<AuthContextProps>({
    user: null,
    signUp: async (email: string, password: string) => { },
    signIn: async (email: string, password: string) => { },
    logout: async () => { },
})

export const AuthContext: FC<{ children: ReactNode }> = (props) => {
    const [user, setUser] = useState<User>({} as User)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser)
            } else {
                setUser({} as User)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])


    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <Context.Provider value={{
            user,
            signUp,
            signIn,
            logout,
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default AuthContext;
export const useAuth = () => React.useContext(Context)