import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { DataContext } from '../../context/dataContext';
import {
    FormPatient,
    SectionCompany,
    InputCNPJ,
    SectionTypeExamAso,
    ItemTypeExam,
    LableItem,
    ItemRisckOccupational,
    SectionListExams,
    ItemExamCheckbox,
    SectionFunction,
    InputFunctionPatient,
    StatusPatientFit,
    StatusPatientUnfit,
    InputComments,
    ButtonSubmit,
    InputName,
    ButtonSearch,
    ListShearch,
    ItemShearch,
    InputSearch,
    HeaderName,
    HeaderCPF,
    ItemShearchHeader,
    ItemName,
    ItemCPF
} from './styleForm';
import { useForm } from "../../hooks/useForm";
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Company, CreateCompanyAPI, InputCreateForm} from "../../types/types";
import { CustomModal } from '../ModalSearch/ModalSearch'
import React from 'react'
import {Patient} from '../Patient/Patient'


export const Form: React.FC = () => {
    const context = useContext(DataContext);

    const { loading, patients, companies, typeExamAso, occupationalHazards, exams, createPatient, createCompany, createForm } = context
    const [listOpionsPatients, setListOptionsPatients] = useState<{ name: string, rg: string, id: string, cpf?: string | undefined }[]>([])
    const [listOpionsCompanies, setListOptionsCompanies] = useState<Company[]>([])
    const [occupationaisRisckForm, setOccupationaisRisckForm] = useState<{ id: string }[]>([])
    const [examsForm, setExamForm] = useState<{ id: string, date: Date | null }[]>([])
    const [statusPatient, setStatusPatient] = useState<boolean | null>(null)
    const [idPatient, setIdPatient] = useState<string>("")
    const [idCompany, setIdCompany] = useState<string>("")
    const [comments, setComments] = useState('');
    const [form, onChange, onItemClick] = useForm(
        {
            name: "",
            rg: "",
            cpf: "",
            nameCompany: "",
            cnpj: "",
            typeExamAso: "",
            functionPatient: "",
            searchPatient: "",
            searchCompany: ""
        })

    const [modalPatientsIsOpen, setModalPatientsIsOpen] = useState(false);
    const [modalCompaniesIsOpen, setModalCompaniesIsOpen] = useState(false);


    const closePatientsModal = () => {
        setModalPatientsIsOpen(false);
    };

    const openCompaniesModal = () => {
        setModalCompaniesIsOpen(true);
    };

    const closeCompaniesModal = () => {   
        setModalCompaniesIsOpen(false);
    };

    useEffect(() => {
        const list = patients.map((patient) => {
            return {
                name: patient.name,
                rg: patient.rg,
                id: patient.id,
                cpf: patient.cpf
            }
        })

        setListOptionsPatients([...list].sort((a, b) => {

            if (a.name < b.name) {
                return - 1
            } else if (a.name > b.name) {
                return 1
            }

            return 0
        }))
    }, [patients])

    useEffect(() => {
        const list: Company[] = companies.map((company) => {
            return {
                name: company.name,
                cnpj: company.cnpj,
                id: company.id,
                createdAt: company.createdAt,
                updatedAt: company.updatedAt

            }
        })

        setListOptionsCompanies([...list].sort((a, b) => {

            if (a.name < b.name) {
                return - 1
            } else if (a.name > b.name) {
                return 1
            }

            return 0
        }))
    }, [companies])

    const handleListOptionsCompanay = (event: ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.value
     
        if (name.length > 0) {
            const newOptions: Company[] = companies.filter((company) => {
                return company.name.toLowerCase().includes(name.toLowerCase())
            }).map((newElement) => {
                return {
                    name: newElement.name,
                    cnpj: newElement.cnpj,
                    id: newElement.id,
                    createdAt: newElement.createdAt,
                    updatedAt: newElement.updatedAt
                }
            }).sort((a, b) => {

                if (a.name < b.name) {
                    return - 1
                } else if (a.name > b.name) {
                    return 1
                }
    
                return 0
            })

            setListOptionsCompanies(newOptions)
        }else {
            setListOptionsCompanies(companies.sort((a, b) => {

                if (a.name < b.name) {
                    return - 1
                } else if (a.name > b.name) {
                    return 1
                }
    
                return 0
            }))
        }
    }

    const handleCheckboxRisck = (id: string) => {

        const elementExist = occupationaisRisckForm.find((risck) => risck.id === id)

        if (elementExist) {
            const filter = occupationaisRisckForm.filter((item) => { return item.id !== id })
            setOccupationaisRisckForm(filter)
        } else {
            setOccupationaisRisckForm([...occupationaisRisckForm, { id }])
        }

    }

    const handleCheckboxExam = (id: string) => {
        const elementExist = examsForm.find((exam) => exam.id === id);

        if (elementExist) {
            // Exame já existe, mantenha a seleção existente
            setExamForm((prevExams) =>
                prevExams.map((exam) =>
                    exam.id === id ? { ...exam, date: exam.date || new Date() } : exam
                )
            );
        } else {
            // Exame não existe, adicione com a data selecionada
            setExamForm([...examsForm, { id, date: new Date() }]);
        }
    };

    const handleDateChange = (selectedDate: Date | null, examId: string) => {
        // Atualize o estado examsForm com a nova data e mantenha o status de seleção
        setExamForm((prevExams) => {
            const updatedExams = prevExams.map((exam) => {
                if (exam.id === examId) {
                    return { ...exam, date: selectedDate };
                }
                return exam;
            });

            return updatedExams;
        });
    };

    const handleComments = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setComments(newValue);
    }

    const sendForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!form.typeExamAso) {
            alert("O tipo do aso não foi informado.")
            return
        }

        if (occupationaisRisckForm.length === 0) {
            alert("É preciso informar pelo menos um risco ocupacional.")
            return
        }

        if (!form.functionPatient) {
            alert("Não foi informado o cargo do paciente.")
            return
        }

        if (statusPatient === null) {
            alert(`É preciso informar se o paciente está apto ou inapto para exercer a função de: ${form.functionPatient}.`)
            return
        }

        if (patients.find((patient) => patient.rg === form.rg && patient.name.toLocaleLowerCase() === form.name.toLocaleLowerCase()) === undefined && idPatient.length === 0) {

            const input: { name: string, rg: string, cpf?: string } = {
                name: form.name,
                rg: form.rg,
                cpf: form.cpf.length > 0 ? form.cpf : undefined
            }

            const id = await createPatient(input) 

            if(typeof(id) === "undefined"){
                return
            }else{
                setIdPatient(id)
            }
            
        }

        if (companies.find((company) => company.cnpj === form.cnpj && company.name.toLocaleLowerCase() === form.nameCompany.toLocaleLowerCase()) === undefined && idCompany.length === 0) {

            const input: CreateCompanyAPI = {
                name: form.name,
                cnpj: form.cnpj
            }

            
            const id = await createCompany(input)

            if(typeof(id) === "undefined"){
                return
            }else{

                setIdCompany(id)
            }

        }


        const dataForm: InputCreateForm = {
            functionPatient: form.functionPatient,
            idCompany: idCompany,
            idExams: examsForm.map((exam) => {
                const dateFormarted = format(exam.date ? exam.date : new Date(), "yyyy-MM-dd")
                return{
                    id: exam.id,
                    date: dateFormarted
                }
            }),
            idOccupationalHazards: occupationaisRisckForm,
            idPatient: idPatient,
            idTypeExamAso: form.typeExamAso,
            status: statusPatient,
            comments
        }
        
        const result = await createForm(dataForm)

        if(result){
            alert('Formuláro criado com sucesso!')
        }else{
            
            return
        }
    }

    const fillForm = (datas: {[key: string]: string}[], id: string, form: 'company' | 'patient'): void => {
        onItemClick(datas)
        if(form === 'company'){
            closeCompaniesModal()
            setIdCompany(id)
        }else{
            closePatientsModal()
            setIdPatient(id)
        }
    }

    return (
        <FormPatient onSubmit={sendForm}>

            <SectionTypeExamAso>
                {
                    !loading ? typeExamAso.sort((a, b) => {

                        if (a.name < b.name) {
                            return - 1
                        } else if (a.name > b.name) {
                            return 1
                        }

                        return 0
                    }).map((type) => {
                        return (
                            <LableItem key={type.id} >
                                <ItemTypeExam
                                    value={type.id}
                                    name='typeExamAso'
                                    checked={type.id === form.typeExamAso}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => { onChange(event) }}
                                />
                                {type.name}
                            </LableItem>
                        )
                    }) : null
                }
            </SectionTypeExamAso>
           
            <Patient/>
            <SectionCompany>
                <InputName placeholder="Empresa"
                    id="nameCompany"
                    name="nameCompany"
                    value={form.nameCompany}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { onChange(event) }}
                    required
                    autoComplete="off"
                />
                <ButtonSearch value={"Buscar"} onClick={openCompaniesModal} />
                <CustomModal isOpen={modalCompaniesIsOpen} onRequestClose={closeCompaniesModal}>
                    <InputSearch placeholder="Digite o nome da empresa..."
                        value={form.searchCompany}
                        id="searchCompany"
                        name="searchCompany"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { onChange(event); handleListOptionsCompanay(event)}}
                    />
                    {
                        !loading ? <ListShearch>
                            <ItemShearchHeader>
                                <HeaderName>Nome</HeaderName>
                                <HeaderCPF>CNPJ</HeaderCPF>
                            </ItemShearchHeader>
                            {
                                listOpionsCompanies.map((item) => {
                                    const dataCompany: {[key: string] : string}[]= [
                                        {
                                            nameCompany: item.name
                                        },
                                        {
                                            cnpj: item.cnpj
                                        }
                                    ]
                                    return(
                                        <ItemShearch key={item.id} onDoubleClick={() => {fillForm(dataCompany, item.id, 'company')}}>
                                            <ItemName>{item.name}</ItemName>
                                            <ItemCPF>{item.cnpj}</ItemCPF>
                                        </ItemShearch>
                                    )
                                })
                            }
                        </ListShearch> : null
                    }
                </CustomModal>
                <InputCNPJ placeholder="CNPJ"
                    id="cnpj"
                    name="cnpj"
                    value={form.cnpj}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { onChange(event) }}
                    required
                    autoComplete="off"
                />

            </SectionCompany>
            <SectionTypeExamAso>
                {
                    !loading ? occupationalHazards.sort((a, b) => {

                        if (a.name < b.name) {
                            return - 1
                        } else if (a.name > b.name) {
                            return 1
                        }

                        return 0
                    }).map((risck) => {
                        return (
                            <LableItem key={risck.id}>
                                <ItemRisckOccupational
                                    value={risck.id}
                                    onChange={() => handleCheckboxRisck(risck.id)}

                                />
                                {risck.name}
                            </LableItem>
                        )
                    }) : null
                }
            </SectionTypeExamAso>
            <SectionListExams>
                {
                    !loading ? exams.sort((a, b) => {

                        if (a.name < b.name) {
                            return - 1
                        } else if (a.name > b.name) {
                            return 1
                        }

                        return 0
                    }).map((exam) => {
                        return (
                            <LableItem key={exam.id}>
                                <ItemExamCheckbox
                                    value={exam.id}
                                    checked={examsForm.find((item) => item.id === exam.id) ? true : false}
                                    onChange={() => handleCheckboxExam(exam.id)}
                                />
                                {exam.name}
                                {
                                    examsForm.find((item) => item.id === exam.id) ? <DatePicker
                                        selected={(examsForm.find((item) => item.id === exam.id))?.date || new Date()}
                                        onChange={(date: Date | null) => handleDateChange(date, exam.id)}
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={new Date()} /> : null
                                }
                            </LableItem>
                        )
                    }) : null
                }
            </SectionListExams>
            <SectionFunction>
                <InputFunctionPatient
                    id="functionPatient"
                    name="functionPatient"
                    value={form.functionPatient}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { onChange(event) }}
                    required
                    autoComplete="off"
                />
                <LableItem>
                    <StatusPatientFit
                        onChange={() => setStatusPatient(true)}
                        checked={statusPatient === true}
                    />
                    Apto
                </LableItem>
                <LableItem>
                    <StatusPatientUnfit
                        onChange={() => setStatusPatient(false)}
                        checked={statusPatient === false}
                    />
                    Inapto
                </LableItem>
            </SectionFunction>
            <InputComments
                id="comments"
                name="comments"
                value={comments}
                onChange={handleComments}
                rows={5}
                cols={50}
                style={{ resize: 'none' }}
                placeholder="Obeservações..."
            />
            <ButtonSubmit value={"Enviar"} />
        </FormPatient>
    );
};
