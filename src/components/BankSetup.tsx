import axios from "axios"
import { Box, Button, Select } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { AccessBank, AccesToken, Bank } from "../types"
import React from "react"

export const BankSetup = () => {
    const [accessToken, setAccessToken] = useState<AccesToken>({} as AccesToken)
    const [loadedBanks, setLoadedBanks] = useState<Bank[]>([])
    const [selectedBank, setSelectedBank] = useState<Bank>()
    const [accessBank, setAccessBank] = useState<AccessBank>()

    useEffect(() => {
        getToken()
    }, [])

    useEffect(() => {
        const country = 'DE'
        const url = `/api/v2/institutions/?country=${country}`
        const headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken?.access}`
        }
        axios.get(url, { headers }).then((response) => {
            setLoadedBanks(response.data)
        }).catch(error => {
            console.error(error.response.data);
        })
    }, [accessToken])

    const getToken = async () => {
        const requestBody = {
            secret_id: '9c59a02e-3f72-4e3b-9d85-be667492572c',
            secret_key: '1a7c7fe62b74b2115b429dfb02b0fcbdfd0c535682f0cf19cdf535d8d79677f682cbc3ab299ae7068a942a66b748e553dfc0468416446a68c21299e50352fb05',
        }
        const url = '/api/v2/token/new/'
        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }
        try {
            const response = await axios.post(url, requestBody, { headers })
            setAccessToken(response.data)
            console.log(response.data.access)
        } catch (error) {
            console.error(error)
        }
    }

    const getRedirectLink = async () => {
        const config = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken?.access}`
            }
        };

        const data = {
            redirect: 'http://localhost:3000/',
            institution_id: selectedBank?.id,
            user_language: 'DE'
        }
        try {
            const response = await axios.post('/api/v2/requisitions/', data, config)
            setAccessBank(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAccounts = async () => {
        const config = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken?.access}`
            }
        }
        try {
            const response = await axios.get(`/api/v2/requisitions/${accessBank?.id}`, config)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tempBank = loadedBanks.filter(bank => bank.id === event.target.value)[0]
        setSelectedBank(tempBank);
    }

    const handleLoginBank = () => {
        getRedirectLink()
        if (accessBank?.link) {
            window.location.href = accessBank.link
        }
    }

    /* const getRedirectLink = () => {
        const config = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken?.access}`
            }
        };

        const data = {
            redirect: 'http://localhost:3000/',
            institution_id: selectedBank?.id,
            user_language: 'DE'
        };

        axios.post('/api/v2/requisitions/', data, config)
            .then(response => {
                setAccessBank(response.data);
            })
            .catch(error => {
                console.error(error.response.data);
            });
    }

    

    const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tempBank = loadedBanks.filter(bank => bank.id === event.target.value)[0]
        setSelectedBank(tempBank);
    }; */

    return (
        <>
            <Box bg='grey' w='100%' p={4} color='white'>
                CashControl - Cashflow Monitoring
            </Box>
            <Box bg='white' w='100%' p={4}>
                <Select placeholder='Bank auswählen' width='20%' onChange={handleSelectBankChange}>
                    {
                        loadedBanks.map((bank) => {
                            return (
                                <option value={bank.id}>{bank.name}</option>
                            )
                        })
                    }
                </Select>
            </Box>
            {
                selectedBank ?
                    (
                        <Box p={4}>
                            <Button onClick={handleLoginBank}>
                                Mit {selectedBank.name} verbinden
                            </Button>
                            <Button onClick={getAccounts}>
                                Accounts anzeigen
                            </Button>
                        </Box>
                    ) : null
            }
        </>
    )
}

export default BankSetup