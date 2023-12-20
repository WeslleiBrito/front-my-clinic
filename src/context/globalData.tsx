import React, { ReactNode, useEffect, useState } from 'react'
import { DataContext } from './dataContext'
import { useFachtData } from '../hooks/useFechtDataHook'
import { Patient } from '../types/types'


interface DataContextProps {
    children: ReactNode
}

export const GlobalDataProvider: React.FC<DataContextProps> = (props) => {

    const {companies, exams, forms, occupationalHazards, patientsAPI, error, loading, typeExamAso} = useFachtData()
    const [patients, setPatients] = useState<Patient[]>([])
    
    useEffect(() => setPatients([...patientsAPI]), [patientsAPI])

    const context = {
        companies,
        exams,
        forms,
        typeExamAso,
        occupationalHazards,
        patients,
        error,
        loading,
        setPatients
    }

    return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>
}