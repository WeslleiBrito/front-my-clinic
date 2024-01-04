import { Company, Exam, Form, OccupationalRisc, Patient, TypeExamAso } from "../types/types"
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/BASE_URL'

export interface UseFetchPostsProps {
    companiesAPI: Company[],
    patientsAPI: Patient[],
    exams: Exam[],
    occupationalHazards: OccupationalRisc[],
    formsAPI: Form[],
    typeExamAso: TypeExamAso[],
    loading: boolean,
    error: boolean
    setLoading: Function
    
  }


export const useFachtData = (): UseFetchPostsProps  => {
    const [companiesAPI, setCompaniesAPI] = useState<Company[]>([])
    const [patientsAPI, setPatientAPI] = useState<Patient[]>([])
    const [exams, setExams] = useState<Exam[]>([])
    const [occupationalHazards, setOccupationalHazards] = useState<OccupationalRisc[]>([])
    const [typeExamAso, setTypeExamAso] = useState<TypeExamAso[]>([])
    const [formsAPI, setFormsAPI] = useState<Form[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    try {
        
        useEffect(() => {

            const getDatas = async () => {
    
                const companies = await axios.get(BASE_URL + '/company')
                setCompaniesAPI(companies.data)
                
                const patients = await axios.get(BASE_URL + '/patients')
                setPatientAPI(patients.data)

                const exams = await axios.get(BASE_URL + '/exam')
                setExams(exams.data)
                
                const occupationalHazards = await axios.get(BASE_URL + '/occupational-risk')
                setOccupationalHazards(occupationalHazards.data)
                
                const forms = await axios.get(BASE_URL + '/form')
                setFormsAPI(forms.data)

                const typeExamsAso = await axios.get(BASE_URL + '/type-exam-aso')
                setTypeExamAso(typeExamsAso.data)

                setLoading(false)
        
            }
            
            getDatas()
        }, [])

    } catch (error) {
        setLoading(false)
        setError(true)

        if (error instanceof AxiosError) {
            console.log(error.response?.status);
          }
    }
    

    return {
        companiesAPI,
        patientsAPI,
        exams,
        occupationalHazards,
        formsAPI,
        typeExamAso,
        loading,
        error,
        setLoading
    }
    
}