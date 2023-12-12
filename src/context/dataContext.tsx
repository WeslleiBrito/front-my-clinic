import {createContext} from "react";
import { UseFetchPostsProps } from "../hooks/useFechtDataHook";

const defaultContextValue: UseFetchPostsProps = {
    companies: [],
    patients: [],
    exams: [],
    occupationalHazards: [],
    forms: [],
    loading: true,
    error: false 
  };

export const DataContext = createContext<UseFetchPostsProps>(defaultContextValue)