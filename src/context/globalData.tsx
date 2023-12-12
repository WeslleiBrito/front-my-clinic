import React, { ReactNode } from 'react'
import { DataContext } from './dataContext'
import { useFachtData } from '../hooks/useFechtDataHook'


interface DataContextProps {
    children: ReactNode
}

export const GlobalDataProvider: React.FC<DataContextProps> = (props) => {

    const {companies, exams, forms, occupationalHazards, patients, error, loading} = useFachtData()

    
    const context = {
        companies,
        exams,
        forms,
        occupationalHazards,
        patients,
        error,
        loading
    }

    return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>
}