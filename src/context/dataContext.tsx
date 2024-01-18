import {ChangeEvent, createContext} from "react";
import { ContextInterface, FormCompany } from "../types/types";

const defaultContextValue: ContextInterface = {
    companies: [],
    patients: [],
    idPatient: "",
    exams: [],
    occupationalHazards: [],
    forms: [],
    typeExamAso: [],
    loading: true,
    error: false,
    setPatients: () => {},
    createPatient: async (): Promise<void> => { return },
    createCompany: async (): Promise<void> => { return },
    setLoading: () => {},
    createForm: async (): Promise<boolean | undefined> => {return},
    handleFunctionPatient: () => {},
    handleIdCompany: () => {},
    handleIdOccupationalHazards: () => {},
    handleIdPatient: () => {},
    handleIdTypeExam: () => {},
    handleStatus: () => {},
    includeIdExam: () => {},
    removeIdExam: () => {},
    formPatient: {
      namePatient: "",
      rg: "",
      cpf: ""
    },
    handleFormPatient: () => {},
    fillFormPatient: () => {},
    formCompany: {
      nameCompany: "",
      cnpj: ""
    },
    handleFormCompany: (event: ChangeEvent<HTMLInputElement> | FormCompany) => {},
    fillFormCompany: (id: string) => {},
    idCompany: "",
    setIdCompany: () => {},
    setIdPatient: () => {}
  };


export const DataContext = createContext<ContextInterface>(defaultContextValue)