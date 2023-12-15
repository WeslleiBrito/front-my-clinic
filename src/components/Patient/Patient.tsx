import React, { useContext, useEffect, useState } from "react";
import Select, { components } from 'react-select';
import { DataContext } from '../../context/dataContext';
import { SectionPatient } from './stylePatient';
import { Patient as PatientI } from '../../types/types';

export const Patient = () => {
    const context = useContext(DataContext);

    const { loading, patients, setPatients } = context;
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [listOpions, setListOptions] = useState<{ name: string, rg: string, cpf?: string | undefined }[]>([])

    const CustomInput = (props: any) => (
        <components.Input {...props} onKeyDown={handleKeyDown} />
    );

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
   

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.currentTarget === document.activeElement) {
            const newPatientName = event.currentTarget.value.trim();

            if (newPatientName !== '' && !patients.some(patient => patient.name === newPatientName)) {
                const newPatient: PatientI = {
                    id: "",
                    cpf: "",
                    createdAt: "",
                    name: newPatientName,
                    rg: "",
                    updatedAt: ""
                };
                setSelectedOption(null); // Limpa a opção selecionada após a adição
            }
        }
    };

    return (
        <SectionPatient>
            <Select
                value={selectedOption}
                onChange={(selected: any) => setSelectedOption(selected)}
                components={{ Input: CustomInput }}
                isClearable
                isSearchable
                options={
                    !loading
                        ? listOpions.map((patient) => ({
                            value: patient.name,
                            label: patient.name
                        }))
                        : []
                }
                placeholder='Selecione um nome ou crie um novo'
            />
        </SectionPatient>
    );
};
