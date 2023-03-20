import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

export const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signUp } = useAuth();

    const handleSubmit = () => {
        try {
            console.log("clicked")
            signUp(email, password);
        } catch (error) {
            console.error(error)
        };
    }

    return (
        <>
            <Box mx={4} my={4}>
                <Heading mb={4} as='h2' size='xl'>Registrieren</Heading>
                <FormControl onSubmit={handleSubmit}>
                    <FormLabel>E-Mail</FormLabel>
                    <Input type="email" placeholder='E-Mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button mt={4} type="submit" onClick={handleSubmit}>Registrieren</Button>
                </FormControl>
            </Box>
            <Button onClick={handleSubmit}>TEST</Button>
        </>
    )
}