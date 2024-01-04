import React, { ReactNode, useEffect, useState } from 'react'
import { DataContext } from './dataContext'
import { useFachtData } from '../hooks/useFechtDataHook'
import { Company, CreateCompanyAPI, CreatePatientAPI, Form, InputCreateForm, Patient, ResponseErrorAxios } from '../types/types'
import axios, { AxiosError }  from 'axios';
import { BASE_URL } from '../../src/constants/BASE_URL'


interface DataContextProps {
    children: ReactNode
}

export const GlobalDataProvider: React.FC<DataContextProps> = (props) => {

    const {companiesAPI, exams, formsAPI, occupationalHazards, patientsAPI, error, loading, typeExamAso, setLoading} = useFachtData()
    const [patients, setPatients] = useState<Patient[]>([])
    const [companies, setCompany] = useState<Company[]>([])
    const [forms, setForms] = useState<Form[]>([])

    useEffect(() => setPatients([...patientsAPI]), [patientsAPI])
    useEffect(() => setCompany([...companiesAPI]), [companiesAPI])
    useEffect(() => setForms([...formsAPI]), [formsAPI])

    const createPatient = async (input: CreatePatientAPI): Promise<string | undefined> => {
        try {
            
            const response = await axios.post(BASE_URL + '/patients',
                input
            )

            const result: Patient[] = (await axios.get(BASE_URL + '/patients')).data
            
            setPatients(result)

            return response.data.id as string
            

        } catch (error) {
            if(error instanceof AxiosError){
                if(typeof(error.response?.data) === "string"){
                    alert(error.response?.data)
                }else{
                    const newError = (error.response?.data as Array<ResponseErrorAxios>)

                    for(const erro of newError){
                        
                        alert(erro.message)
                    }
                }
            }
            
        }
    }

    const createCompany = async (input: CreateCompanyAPI): Promise<string | undefined> => {

        try {
            const response = await axios.post(BASE_URL + '/company',
                input
            )

            const result: Company[] = (await axios.get(BASE_URL + '/company')).data

            setCompany(result)

            return response.data.id as string

        } catch (error) {
            if(error instanceof AxiosError){
                if(typeof(error.response?.data) === "string"){
                    alert(error.response?.data)
                }else{
                    const newError = (error.response?.data as Array<ResponseErrorAxios>)

                    for(const erro of newError){
                        
                        alert(erro.message)
                    }
                }
            }
        }
    }

    const createForm = async (input: InputCreateForm): Promise<boolean | undefined> => {
        try {
            await axios.post(BASE_URL + '/form', input)
            return true
        } catch (error) {
        
            if(error instanceof AxiosError){
                if(error.code === "ERR_NETWORK"){
                    alert('Servidor fora do ar, entre em contato com o desenvolvedor do sistema.')
                }
               
            }

            return
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
        createCompany,
        createForm,
        setLoading
    }

    return <DataContext.Provider value={context}>{props.children}</DataContext.Provider>
}