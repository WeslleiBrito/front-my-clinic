
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
    numberProcedures: number,
    amount: number,
    createdAt: string,
    updatedAt: string,
    exams: {
        id: string,
        name: string,
        price: number
    }[],
    OccupationalHazards: {
        id: string,
        name: string
    }[]
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
