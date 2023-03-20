import { prototype } from 'events'
import firebase, { initializeApp } from 'firebase/app'
import 'firebase/auth'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { createContext, FC, ReactNode } from 'react'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
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