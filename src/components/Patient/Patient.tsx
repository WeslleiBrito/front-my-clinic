import { useContext, useEffect, useState, ChangeEvent } from "react";
import { DataContext } from '../../context/dataContext';
import { Name, FormPatient, SuggestionsList, SuggestionItem } from './stylePatient';
import { useForm } from "../../hooks/useForm";

export const Patient = () => {
    const context = useContext(DataContext);

    const { loading, patients } = context
    const [listOpions, setListOptions] = useState<{ name: string, rg: string, cpf?: string | undefined }[]>([])
    const [form, onChange] = useForm({name: ""})
    
    useEffect(() => {
        const list = patients.map((patient) => {
            return {
                    name: patient.name,
                    rg: patient.rg,
                    cpf: patient.cpf
                }
        })

        setListOptions([...list])
    }, [patients])

    const handleListOptions = (event: ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.value

        if(patients && name.length > 0){
            const newOptions: {name: string, rg: string, cpf?: string | undefined }[] = patients.filter((patient) => {
                return patient.name.toLowerCase().includes(name.toLowerCase())
            }).map((newElement) => {
                return {
                    name: newElement.name,
                    rg: newElement.rg,
                    cpf: newElement.cpf
                }
            })

            setListOptions(newOptions)
        }
    }
    
    return (
        <FormPatient>
            <Name placeholder='Selecione um nome ou crie um novo' 
                id='name' 
                name='name' 
                value={form.name} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event)}} 
                required
                autoComplete='off'
            />
            <SuggestionsList>
                {
                    !loading && form.name.length > 0? listOpions.map((option) => {
                        return(
                            <SuggestionItem key={option.rg} value={option.name}>{option.name}</SuggestionItem>
                        )
                    }): null
                }
            </SuggestionsList>
        </FormPatient>
    );
};
