
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
    cnpj: string | undefined,
    cpf: string | undefined,
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
    exams: Exam[],
    occupationalHazards: OccupationalRisc[],
    forms: Form[],
    typeExamAso: TypeExamAso[],
    loading: boolean,
    error: boolean,
    setPatients: Function,
    createPatient: Function,
    createCompany: Function,
    setLoading: Function,
    createForm: (input: InputCreateForm) => Promise<boolean | undefined>
}

export interface TypeExamAso {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface InputCreateForm {
    idCompany: string,
    idPatient: string,
    idTypeExamAso: string,
    functionPatient: string,
    status: boolean,
    idExams: {
        id: string,
        date: string
    }[],
    idOccupationalHazards: {
        id: string
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
    cnpj: string
}

export interface ResponseErrorAxios {
    code: string, 
    message: string, 
    path: Array<string>, 
    validation: string
}