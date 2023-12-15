import {createContext} from "react";
import { ContextInterface } from "../types/types";

const defaultContextValue = {
    companies: [],
    patients: [],
    exams: [],
    occupationalHazards: [],
    forms: [],
    loading: true,
    error: false,
    setPatients: () => {}
  };


export const DataContext = createContext<ContextInterface>(defaultContextValue)