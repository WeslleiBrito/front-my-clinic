import { useContext, useEffect, useState, ChangeEvent } from "react";
import { DataContext } from '../../context/dataContext';
import { InputName, FormPatient, SuggestionsList, SuggestionItem, InputRG, InputCPF } from './stylePatient';
import { useForm } from "../../hooks/useForm";

export const Patient = () => {
    const context = useContext(DataContext);

    const { loading, patients } = context
    const [listOpions, setListOptions] = useState<{ name: string, rg: string, cpf?: string | undefined}[]>([])
    const [form, onChange, onItemClick] = useForm({name: "", rg: "", cpf: ""})
    const [selected, setSelected] = useState<boolean>(false)
    const [isInputFocused, setIsInputFocused] = useState(false);

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

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };
    

    const handleListOptions = (event: ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.value

        if(patients && name.length > 0){
            const newOptions: {name: string, rg: string, cpf?: string | undefined}[] = patients.filter((patient) => {
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
            <InputName placeholder='Selecione um nome ou crie um novo' 
                id='name' 
                name='name' 
                value={form.name} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event); setSelected(false)}}
                required 
                onClick={handleFocus}   
                autoComplete='off'
            />
            <SuggestionsList>
                {
                    !loading && form.name.length > 0 && !selected && isInputFocused? listOpions.map((option) => {
                        return(
                            <SuggestionItem key={option.rg} 
                            value={option.name} 
                            onClick={() => 
                                {
                                    {onItemClick(
                                        [
                                            {
                                                "name": option.name
                                            },
                                            {
                                                "rg": option.rg
                                            },
                                            {
                                                "cpf": option.cpf
                                            }
                                        ]
                                    ); 
                                    setSelected(true)}  
                                }
                            }
                            >{option.name}
                            </SuggestionItem>
                        )
                    }): null
                }
            </SuggestionsList>
            <InputRG placeholder="RG"
                id="rg"
                name="rg"
                value={form.rg}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event); setSelected(false)}}
                onClick={handleBlur}
                required
                autoComplete="off"
                pattern="/^\d{1,2}([.-]?)\d{3}\1\d{3}\1\d{1,2}$/"
            />
            <InputCPF placeholder="CPF"
                id="cpf"
                name="cpf"
                value={form.cpf}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event); setSelected(false)}}
                onClick={handleBlur}
                autoComplete="off"
                pattern="/^\d{3}([.-]?)\d{3}\1\d{3}\1\d{2}$/"
            />
        </FormPatient>
    );
};
