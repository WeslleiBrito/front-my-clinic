import React, { ReactNode, useEffect, useState } from 'react'
import { DataContext } from './dataContext'
import { useFachtData } from '../hooks/useFechtDataHook'
import { CreatePatientAPI, Patient } from '../types/types'
import axios  from 'axios';
import { BASE_URL } from '../../src/constants/BASE_URL'

interface DataContextProps {
    children: ReactNode
}

export const GlobalDataProvider: React.FC<DataContextProps> = (props) => {

    const {companies, exams, forms, occupationalHazards, patientsAPI, error, loading, typeExamAso, setLoading} = useFachtData()
    const [patients, setPatients] = useState<Patient[]>([])
    
    useEffect(() => setPatients([...patientsAPI]), [patientsAPI])

    const createPatient = async (input: CreatePatientAPI) => {
        try {
            
            await axios.post(BASE_URL + '/patients',
                input
            )

            const result: Patient[] = (await axios.get(BASE_URL + '/patients')).data

            setPatients(result)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const context = {
        companies,
        exams,
        forms,
        typeExamAso,
        occupationalHazards,
        patients,
        error,
        loading,
        setPatients,
        createPatient,
        setLoading
    }

    return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>
}