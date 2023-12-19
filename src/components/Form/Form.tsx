import { useContext, useEffect, useState, ChangeEvent } from "react";
import { DataContext } from '../../context/dataContext';
import { FormPatient, InputRG, InputCPF, SectionPatient, SectionCompany, InputCNPJ } from './styleForm';
import { useForm } from "../../hooks/useForm";
import Select from 'react-select'
export const Form = () => {
    const context = useContext(DataContext);

    const { loading, patients, companies } = context
    const [listOpionsPatients, setListOptionsPatients] = useState<{ name: string, rg: string, cpf?: string | undefined}[]>([])
    const [listOpionsCompanies, setListOptionsCompanies] = useState<{ nameCompany: string, cnpj: string }[]>([])

    const [form, onChange, onItemClick] = useForm(
        {
            name: "", 
            rg: "", 
            cpf: "",
            nameCompany: "",
            cnpj: ""
        }
    )
 

    useEffect(() => {
        const list = patients.map((patient) => {
            return {
                    name: patient.name,
                    rg: patient.rg,
                    cpf: patient.cpf
                }
        })

        setListOptionsPatients([...list])
    }, [patients])

    useEffect(() => {
        const list = companies.map((company) => {
            return {
                    nameCompany: company.name,
                    cnpj: company.cnpj
                }
        })

        setListOptionsCompanies([...list])
    }, [companies])
    
    const handleInputChange = (newValue: any, propertyName: string, actionMeta: any) => {
        if (actionMeta.action === 'input-change') {
            // Atualiza o estado com o valor inserido pelo usuário
            onChange({ target: { name: propertyName, value: newValue } } as ChangeEvent<HTMLInputElement>);
        }
   
    }

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

            setListOptionsPatients(newOptions)
        }
    }
    
    return (
        <FormPatient >
            <SectionPatient>

                <Select 
                    options={!loading ? listOpionsPatients.map(patient => ({ label: patient.name, value: patient.name })) : []}
                    value={{ label: form.name, value: form.name }}
                    isSearchable
                    onChange={(selectedOption: any) => {
                        // Atualiza o estado com a opção selecionada
                        onChange({ target: { name: 'name', value: selectedOption.value } } as ChangeEvent<HTMLInputElement>);
                        const itemSelected = listOpionsPatients.find((item) => item.name === selectedOption.value) as {name: string, rg: string, cpf: string | undefined}

                        onItemClick([
                            {name: itemSelected.name},
                            {rg: itemSelected.rg},
                            {cpf: itemSelected.cpf ? itemSelected.cpf : ""}
                        ])
                        
                    }}
                    onInputChange={(newValue, actionMeta) => {handleInputChange(newValue, 'name', actionMeta)}}
                    noOptionsMessage={() => "Nenhum registro encontrado"}
                /> 
                <InputRG placeholder="RG"
                    id="rg"
                    name="rg"
                    value={form.rg}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event)}}
                    required
                    autoComplete="off"
                    pattern="/^\d{1,2}([.-]?)\d{3}\u0021\d{3}\u0021\d{1,2}$/"
                />
                <InputCPF placeholder="CPF"
                    id="cpf"
                    name="cpf"
                    value={form.cpf}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event)}}
                    autoComplete="off"
                    pattern="/^\d{3}([.-]?)\d{3}\u0021\d{3}\u0021\d{2}$/"
                />
            </SectionPatient>
            <SectionCompany>
            <Select 
                    options={!loading ? listOpionsCompanies.map(company => ({ label: company.nameCompany, value: company.nameCompany })) : []}
                    value={{ label: form.nameCompany, value: form.nameCompany }}
                    isSearchable
                    onChange={(selectedOption: any) => {
                        // Atualiza o estado com a opção selecionada
                        onChange({ target: { name: 'nameCompany', value: selectedOption.value } } as ChangeEvent<HTMLInputElement>);
                        const itemSelected = listOpionsCompanies.find((item) => item.nameCompany === selectedOption.value) as {nameCompany: string, cnpj: string}

                        onItemClick([
                            {nameCompany: itemSelected.nameCompany},
                            {cnpj: itemSelected.cnpj}
                        ])
                    }}
                    onInputChange={(newValue, actionMeta) => handleInputChange(newValue, 'nameCompany', actionMeta)}
                    noOptionsMessage={() => "Nenhum registro encontrado"}
                /> 
                <InputCNPJ placeholder="CNPJ"
                    id="cnpj"
                    name="cnpj"
                    value={form.cnpj}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event)}}
                    required
                    autoComplete="off"
                />

            </SectionCompany>
        </FormPatient>
    );
};
