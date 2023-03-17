import React, {useState } from 'react'
import { useAuth } from '../context/AuthContext';

function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            await signUp(email, password);
        } catch (error) {
            console.error(error)
        };

        return (
            <>
                <div>
                    <h2>Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </>
        )
    }
}

export default Registration