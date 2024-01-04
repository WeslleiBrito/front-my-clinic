import {createContext} from "react";
import { ContextInterface } from "../types/types";

const defaultContextValue = {
    companies: [],
    patients: [],
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
    createForm: async (): Promise<boolean | undefined> => {return}
  };


export const DataContext = createContext<ContextInterface>(defaultContextValue)