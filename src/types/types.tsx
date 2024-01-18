import { ChangeEvent } from "react"

export enum USER_ROLES {
    ADMIN = "ADMIN",
    MASTER = "MASTER",
    NORMAL = "NORMAL"
}


export interface Company {
    id: string
    name: string
    cnpj: string 
    createdAt: string
    updatedAt: string
}

export interface Form {
    id: string,
    idCompany: string,
    idPatient: string,
    nameCompany: string,
    namePatient: string,
    rg: string,
    cnpj: string,
    cpf: string,
    functionPatient: string,
    status: boolean,
    numberProcedures: number,
    amount: number,
    createdAt: string,
    updatedAt: string,
    typeExamAso: {
        id: string,
        name: string
    },
    exams: {
        id: string,
        name: string,
        price: number,
        date: string
    }[],
    OccupationalHazards: {
        id: string,
        name: string
    }[],
    comments: string  
}

export interface Exam {
    id: string,
    name: string,
    price: number,
    createdAt: string,
    updatedAt: string
}

export interface OccupationalRisc {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface Patient {
    id: string,
    name: string,
    rg: string,
    cpf: string | undefined,
    createdAt: string,
    updatedAt: string
}

export interface TypeExamAso {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface ContextInterface {
    companies: Company[],
    patients: Patient[],
    idPatient: string,
    idCompany: string,
    exams: Exam[],
    occupationalHazards: OccupationalRisc[],
    forms: Form[],
    typeExamAso: TypeExamAso[],
    loading: boolean,
    error: boolean,
    setPatients: Function,
    createPatient: (input: CreatePatientAPI) => Promise<void>,
    createCompany: (input: CreateCompanyAPI) => Promise<void>,
    setLoading: Function,
    createForm: (input: InputForm) => Promise<boolean | undefined>,
    handleFunctionPatient: Function,
    handleIdCompany: Function,
    includeIdExam: Function,
    removeIdExam: Function,
    handleIdOccupationalHazards: Function,
    handleIdPatient: (newIdPatient: string) => void,
    handleIdTypeExam: Function,
    handleStatus: Function,
    formPatient: FormPatient,
    handleFormPatient: Function,
    fillFormPatient: (id: string) => void,
    formCompany: FormCompany,
    handleFormCompany: (event: ChangeEvent<HTMLInputElement>) => void,
    fillFormCompany: (id: string) => void
}

export interface TypeExamAso {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface InputForm {
    idCompany: string,
    idPatient: string,
    idTypeExamAso: string,
    functionPatient: string,
    status: boolean | null,
    idExams: {
        id: string,
        date: string
    }[],
    idOccupationalHazards: {
        id: string
    }[] | {
        id: string,
        acction: boolean
    }[],
    comments? : string 
}

export interface CreatePatientAPI {
    name: string,
    rg: string,
    cpf?: string
}

export interface CreateCompanyAPI {
    name: string,
    cnpj?: string 
}

export interface ResponseErrorAxios {
    code: string, 
    message: string, 
    path: Array<string>, 
    validation: string
}

export interface FormPatient { 
    namePatient: string,
    rg: string,
    cpf?: string
}

export interface FormCompany {
    nameCompany: string,
    cnpj?: string
}