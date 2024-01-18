import { useContext, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { DataContext } from '../../context/dataContext';
import {
    FormAso,
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
    ButtonSubmit
} from './styleForm';
import { useForm } from "../../hooks/useForm";
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CreateCompanyAPI, Form as FormType, InputForm} from "../../types/types";
import React from 'react'
import { Patient } from '../Patient/Patient'
import { Company } from "../Company/Company";
import { useParams, useNavigate } from "react-router-dom";
import { goForms } from "../../Routes/coordinator";


export const Form: React.FC = () => {
    const context = useContext(DataContext);

    const { loading, patients, companies, typeExamAso, occupationalHazards, exams, createPatient, createCompany, createForm, formCompany, formPatient, idPatient, idCompany, forms } = context
    const [occupationaisRisckForm, setOccupationaisRisckForm] = useState<{ id: string }[]>([])
    const [editOccupationalRisckForm, setEditOccupationaisRisckForm] = useState<{id: string, acction: boolean}[]>([])
    const [editExams, setEditExams] = useState<{id: string, date: Date, acction: boolean}[]>([])
    const [examsForm, setExamForm] = useState<{ id: string, date: Date | null }[]>([])
    const [statusPatient, setStatusPatient] = useState<boolean | null>(null)
    const [comments, setComments] = useState('');
    const [selectedTypeExamAso, setSelectedTypeExamAso] = useState<string>("")

    const { idForm } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        
        if(idForm){

            const formExist = forms.find((form) => {return form.id === idForm})
            
            if(formExist){
                const occupationaisRisck: { id: string }[] = formExist.OccupationalHazards.map((risck) => {return {id: risck.id}}) 
                setOccupationaisRisckForm(occupationaisRisck)
                const exams: { id: string, date: Date | null }[] = formExist.exams.map((exam) => {return {id: exam.id, date: new Date(exam.date)}})
                setExamForm(exams)
                setStatusPatient(formExist.status)
                setComments(formExist.comments)
                setSelectedTypeExamAso(formExist.typeExamAso.id)
                setComments(formExist.comments)

            }else if(!formExist && forms.length > 0){
            
                alert("O id informado não existe.")
                goForms(navigate)
            }
        }
    }, [forms, idForm, navigate])
  
    const [form, onChange] = useForm(
        {
            functionPatient: ""
        }
    )
  
    const handleCheckboxRisck = (id: string) => {

        const elementExist = occupationaisRisckForm.find((risck) => risck.id === id)

        if (elementExist) {
            const filter = occupationaisRisckForm.filter((item) => { return item.id !== id })
            setOccupationaisRisckForm(filter)
        } else {
            setOccupationaisRisckForm([...occupationaisRisckForm, { id }])
        }

        if(idForm){
            const formExist = forms.find((form) => {return form.id === idForm}) as FormType
            const risckExist = formExist.OccupationalHazards.find((item) => item.id === id)

            if(risckExist){
               if(editOccupationalRisckForm.find((risck) => risck.id === risckExist.id)){
                    const filter = editOccupationalRisckForm.filter((item) => {return  item.id !== id})
                    setEditOccupationaisRisckForm(filter)
               }else{
                    setEditOccupationaisRisckForm([...editOccupationalRisckForm, {id: id, acction: false}])
               }

            }else{
                setEditOccupationaisRisckForm([...editOccupationalRisckForm, {id: id, acction: true}])
            }
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

        if(idForm){
            const formExist = forms.find((form) => {return form.id === idForm}) as FormType
            const exam = formExist.exams.find((exam) => exam.id === id)

            if(exam){
                if(editExams.find((exam) => exam.id === id)){
                    const filter = [...editExams].filter((item) => {return item.id !== id})
                    setEditExams(filter)
                }else{
                    setEditExams([...editExams, {id: id, acction: false, date: new Date(exam.date)}])
                }
            }else{
               
                setEditExams([...editExams, {id, acction: true, date: new Date()}])
            }
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

    const handleTypeExamAso = (id: string): void => {
        setSelectedTypeExamAso(id)
    }

    const sendForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (selectedTypeExamAso.length === 0) {
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

        if (patients.find((patient) => patient.rg === formPatient.rg && patient.name.toLocaleLowerCase() === formPatient.namePatient.toLocaleLowerCase()) === undefined && idPatient.length === 0) {

            const input: { name: string, rg: string, cpf?: string } = {
                name: formPatient.namePatient,
                rg: formPatient.rg,
                cpf: formPatient.cpf
            }

            await createPatient(input) 
            
        }

        if (companies.find((company) => company.cnpj === formCompany.cnpj && company.name.toLocaleLowerCase() === formCompany.nameCompany.toLocaleLowerCase()) === undefined && idCompany.length === 0) {

            const input: CreateCompanyAPI = {
                name: formCompany.nameCompany,
                cnpj: formCompany.cnpj
            }
            
            await createCompany(input)
        }

        const dataForm: InputForm = {
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
            idTypeExamAso: selectedTypeExamAso,
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

    return (
        <FormAso onSubmit={sendForm}>

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
                                    checked={type.id === selectedTypeExamAso}
                                    onChange={() => {handleTypeExamAso(type.id)}}
                                />
                                {type.name}
                            </LableItem>
                        )
                    }) : null
                }
            </SectionTypeExamAso>
            <Patient id={idForm}/>
            <Company id={idForm}/>
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
                                    id={risck.id + risck.name}
                                    value={risck.id}
                                    onChange={() => handleCheckboxRisck(risck.id)}
                                    checked={occupationaisRisckForm.find((risckItem) => {return risckItem.id === risck.id}) ? true : false}

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
                                    id={exam.id}
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
                        id="fit"
                        onChange={() => setStatusPatient(true)}
                        checked={statusPatient === true}
                    />
                    Apto
                </LableItem>
                <LableItem>
                    <StatusPatientUnfit
                        id="unFit"
                        onChange={() => setStatusPatient(false)}
                        checked={statusPatient === false}
                    />
                    Inapto
                </LableItem>
            </SectionFunction>
            <InputComments
                name="comments"
                value={comments}
                onChange={handleComments}
                rows={5}
                cols={50}
                style={{ resize: 'none' }}
                placeholder="Obeservações..."
            />
            <ButtonSubmit value={"Enviar"} />
        </FormAso>
    );
};
