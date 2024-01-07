import {createContext} from "react";
import { ContextInterface } from "../types/types";

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
    createPatient: (): string | undefined => { return },
    createCompany: (): string | undefined => { return },
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
      name: "",
      rg: "",
      cpf: ""
    },
    handleFormPatient: () => {},
    fillFormPatient: () => {}
  };


export const DataContext = createContext<ContextInterface>(defaultContextValue)