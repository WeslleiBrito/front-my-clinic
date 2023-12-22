import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { DataContext } from '../../context/dataContext';
import { FormPatient, 
    InputRG, 
    InputCPF, 
    SectionPatient, 
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
    ButtonSubmit
} from './styleForm';
import { useForm } from "../../hooks/useForm";
import Select from 'react-select'
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputCreateForm } from "../../types/types";

export const Form = () => {
    const context = useContext(DataContext);

    const { loading, patients, companies, typeExamAso, occupationalHazards, exams } = context
    const [listOpionsPatients, setListOptionsPatients] = useState<{ name: string, rg: string, id: string, cpf?: string | undefined}[]>([])
    const [listOpionsCompanies, setListOptionsCompanies] = useState<{ nameCompany: string, cnpj: string }[]>([])
    const [occupationaisRisckForm, setOccupationaisRisckForm] = useState<{id: string}[]>([])
    const [examsForm, setExamForm] = useState<{id: string, date: Date | null}[]>([])
    const [statusPatient, setStatusPatient] = useState<boolean | null>(null)
    const [comments, setComments] = useState('');
    const [form, onChange, onItemClick] = useForm(
        {
            name: "", 
            rg: "", 
            cpf: "",
            nameCompany: "",
            cnpj: "",
            typeExamAso: "",
            functionPatient: ""
        }
    )
        
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
                        
            if(a.name < b.name){
                return - 1
            }else if(a.name > b.name){
                return 1
            }

            return 0
        }))
    }, [patients])

    useEffect(() => {
        const list = companies.map((company) => {
            return {
                    nameCompany: company.name,
                    cnpj: company.cnpj
                }
        })

        setListOptionsCompanies([...list].sort((a, b) => {
                        
            if(a.nameCompany < b.nameCompany){
                return - 1
            }else if(a.nameCompany > b.nameCompany){
                return 1
            }

            return 0
        }))
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
            const newOptions: {name: string, rg: string, id: string, cpf?: string | undefined}[] = patients.filter((patient) => {
                return patient.name.toLowerCase().includes(name.toLowerCase())
            }).map((newElement) => {
                return {
                    name: newElement.name,
                    rg: newElement.rg,
                    id: newElement.id,
                    cpf: newElement.cpf
                }
            })

            setListOptionsPatients(newOptions)
        }
    }

    const handleCheckboxRisck = (id: string) => {
        
        const elementExist = occupationaisRisckForm.find((risck) => risck.id === id)

        if(elementExist){
            const filter = occupationaisRisckForm.filter((item) => {return item.id !== id})
            setOccupationaisRisckForm(filter)
        }else{
            setOccupationaisRisckForm([...occupationaisRisckForm, {id}])
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

    const createForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const regexRG = /^\d{1,2}(\d{3})?(\d{3})?-?\d{1,2}$/
        const regexCPF = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/

        if(!form.typeExamAso){
            alert("O tipo do aso não foi informado.")
            return
        }

        if(!form.name){
            alert("O nome do paciente é obrigatório.")
            return
        }

        if(!form.nameCompany){
            alert("O nome da empresa é obrigatório.")
            return
        }

        if(!regexRG.test(form.rg)){
            alert("RG inválido verifique e tente novamente.")
            return
        }
        
        if(form.cpf && !regexCPF.test(form.cpf)){
            alert("CPF inválido verifique e tente novamente.")
            return
        }

        if(occupationaisRisckForm.length === 0){
            alert("É preciso informar pelo menos um risco ocupacional.")
            return
        }

        if(!form.functionPatient){
            alert("Não foi informado o cargo do paciente.")
            return
        }

        if(statusPatient === null){
            alert(`É preciso informar se o paciente está apto ou inapto para exercer a função de: ${form.functionPatient}.`)
            return
        }

        

    } 

    return (
        <FormPatient onSubmit={createForm}>
            
            <SectionTypeExamAso>
                {
                    !loading ? typeExamAso.sort((a, b) => {

                        if(a.name < b.name){
                            return - 1
                        }else if(a.name > b.name){
                            return 1
                        }

                        return 0
                    }).map((type) => {
                        return(
                            <LableItem key={type.id} >
                                <ItemTypeExam   
                                    value={type.id}
                                    name='typeExamAso'
                                    checked={type.id === form.typeExamAso}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event)}}
                                />
                                {type.name}
                            </LableItem>
                        )
                    }): null
                }
            </SectionTypeExamAso>
            <SectionPatient>
                <LableItem>
                    Paciente
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
                        required
                    /> 
                    
                </LableItem>
                
                <InputRG placeholder="RG"
                    id="rg"
                    name="rg"
                    value={form.rg}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event)}}
                    required
                    autoComplete="off"
                    disabled={listOpionsPatients.length > 0 ? true : false}
                />
                <InputCPF placeholder="CPF"
                    id="cpf"
                    name="cpf"
                    value={form.cpf}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event)}}
                    autoComplete="off"
                    disabled={listOpionsPatients.length > 0 ? true : false}
                />
            </SectionPatient>
            <SectionCompany>
            <LableItem>
                Empresa
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
                    required
                /> 
            </LableItem>
            
                <InputCNPJ placeholder="CNPJ"
                    id="cnpj"
                    name="cnpj"
                    value={form.cnpj}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); handleListOptions(event)}}
                    required
                    autoComplete="off"
                />

            </SectionCompany>
            <SectionTypeExamAso>
                {
                    !loading ? occupationalHazards.sort((a, b) => {

                        if(a.name < b.name){
                            return - 1
                        }else if(a.name > b.name){
                            return 1
                        }

                        return 0
                    }).map((risck) => {
                        return(
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

                        if(a.name < b.name){
                            return - 1
                        }else if(a.name > b.name){
                            return 1
                        }

                        return 0
                    }).map((exam) => {
                        return(
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
                                        maxDate={new Date()}/> : null
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event)}}
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
                style={{resize: 'none'}}  
                placeholder="Obeservações..."   
            />
            <ButtonSubmit value={"Enviar"}/>
        </FormPatient>
    );
};
