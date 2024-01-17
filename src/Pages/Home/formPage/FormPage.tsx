import { ChangeEvent, useContext, useEffect, useState } from "react"
import {
    CNPJItem,
    CPFItem,
    CompanyItem, 
    DateItem,
    DeleteButton,
    DivButtons, 
    DivOptions,
    EditButton,
    FunctionPatientItem,
    InputSearch,
    ItemHeaderList,
    ItemList,
    Lable,
    ListForms,
    Main,
    NameItem,
    NewButton,
    OptiosRadios,
    SectionSearch,
    TypeExam,
    CheckedFormItem

} from "./styleFormPage"
import { DataContext } from "../../../context/dataContext"
import { Form } from "../../../types/types"
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from "../../../hooks/useForm";
import { goForm } from "../../../Routes/coordinator";
import { useNavigate } from "react-router-dom";


export const FormPage = () => {

    const context = useContext(DataContext)
    type searchMethods  = "namePatient" | "nameCompany" | "cpf" | "cnpj" | "functionPatient" | "createdAt"
    const {forms, loading} = context

    const [listForm, setListForm] = useState<Form[]>([])
    const [typeSearchMethod, setTypeSearchMethod] = useState<searchMethods>("namePatient")
    const [order, setOrder] = useState<boolean>(true)
    const [checkedFormItens, setCheckedFormItens] = useState<string[]>([])
    const [checkedAllForms, setCheckedAllForms] = useState<boolean>(false)
    const [formSelected, setFormSelected] = useState<string>("")

    const navigate = useNavigate()
    useEffect(() => {

        const newList: Form[] = forms.reverse()

        setListForm(newList)

    }, [forms])

    const [form, onChange] = useForm(
        {
            search: ""
        }
    )
    
    const goEdit = () => {
        
        if(formSelected.length < 1){
            alert("Selecione um formulário aso que deseja editar.")
        }else{
            goForm(navigate, formSelected)
        }
    }

    const filterListForm = (event: ChangeEvent<HTMLInputElement>) => {
        const valueSearch = event.target.value

        const newList = forms.filter((form) => {            
            return form[typeSearchMethod]?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(valueSearch.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        }).sort((a, b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)

            if(order){
                return dateB.getTime() - dateA.getTime()
            }

            if(!order){
                return dateA.getTime() - dateB.getTime()
            }

            return 0
        })


        setListForm(newList)
    }

    const handleOrder = (column: searchMethods) => {
        const newOrder = [...listForm]
        setOrder(!order)
        if(column === "createdAt"){
            console.log("é a coluna da data");
            
            newOrder.sort((a, b) => {
                const dateA = new Date(a.createdAt)
                const dateB = new Date(b.createdAt)
                
                if(dateB.getTime() > dateA.getTime()){
                    return order ? - 1 : 1
                }

                if(dateB.getTime() < dateA.getTime()){
                    return  order ? 1 : - 1
                }
                
                return 0
            })

        }else{

            newOrder.sort((a, b) => {

                if(a[column] < b[column]){
                    return order ? - 1 : 1 
                }
                

                if(a[column] > b[column]){
                    return order ? 1 : - 1
                }

                return 0
            })
        }
        
        console.log(newOrder)
        setListForm(newOrder)
        
    }

    const handleCheck = (id: string): void => {

        const itemExist = checkedFormItens.find((item) => item === id)

        if(!itemExist){
            setCheckedFormItens([...checkedFormItens, id])
        }else{
            setCheckedFormItens([...checkedFormItens].filter((item) => {return item !== id}))
        }
    }

    const handleCheckedAll = (): void => {

        if(checkedAllForms){
            setCheckedFormItens([])
        }else{
            setCheckedFormItens([...listForm].map((item) => item.id))
        }

        setCheckedAllForms(!checkedAllForms)
    }

    const component = (
        <Main>
            <SectionSearch>
                <DivOptions>
                    <Lable>
                        <OptiosRadios checked={typeSearchMethod === "namePatient"}
                            onChange={() => {setTypeSearchMethod("namePatient")}}
                        />
                        Nome
                    </Lable>
                    <Lable>
                        <OptiosRadios checked={typeSearchMethod === "nameCompany"}
                            onChange={() => {setTypeSearchMethod("nameCompany")}}
                        />
                        Empresa
                    </Lable>
                    <Lable>
                        <OptiosRadios checked={typeSearchMethod === "cpf"}
                            onChange={() => {setTypeSearchMethod("cpf")}}
                        />
                        CPF
                    </Lable>
                    <Lable>
                        <OptiosRadios checked={typeSearchMethod === "cnpj"}
                            onChange={() => {setTypeSearchMethod("cnpj")}}
                        />
                        CNPJ
                    </Lable>
                </DivOptions>
                <InputSearch
                    name="search"
                    value={form.search}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event); filterListForm(event)}}
                />
                <DivButtons>
                    <NewButton value={"Novo"} onClick={() => {goForm(navigate)}}/>
                    <EditButton value={"Editar"} onClick={() => {goEdit()}}/>
                    <DeleteButton value={"Excluir"}/>
                </DivButtons>
            </SectionSearch>
            <ListForms>
                <ItemHeaderList>
                    <CheckedFormItem onChange={() => {handleCheckedAll(); setFormSelected("")}} checked={checkedAllForms}/>
                    <NameItem onClick={() => {handleOrder("namePatient")}}>Nome</NameItem>
                    <CompanyItem onClick={() => {handleOrder("nameCompany")}}>Empresa</CompanyItem>
                    <CPFItem onClick={() => {handleOrder("cpf");}}>CPF</CPFItem>
                    <CNPJItem onClick={() => {handleOrder("cnpj")}}>CNPJ</CNPJItem>
                    <FunctionPatientItem onClick={() => {handleOrder("functionPatient"); setOrder(!order)}}>Função</FunctionPatientItem>
                    <TypeExam>Tipo de Exame</TypeExam>
                    <DateItem onClick={() => {handleOrder("createdAt")}}>Dt. Criação</DateItem>
                </ItemHeaderList>
                    {
                        listForm.map((form) => {
                        
                            return(
                                <ItemList key={form.id} onClick={() => setFormSelected(form.id)} $isActive={formSelected === form.id ? true : false}>
                                    <CheckedFormItem onChange={() => {handleCheck(form.id)}} checked={checkedFormItens.find((item) => {return item === form.id}) ? true : false}/>
                                    <NameItem>{form.namePatient}</NameItem>
                                    <CompanyItem>{form.nameCompany}</CompanyItem>
                                    <CPFItem>{form.cpf}</CPFItem>
                                    <CNPJItem>{form.cnpj}</CNPJItem>
                                    <FunctionPatientItem>{form.functionPatient}</FunctionPatientItem>
                                    <TypeExam>{form.typeExamAso.name}</TypeExam>
                                    <DateItem>{format(new Date(form.createdAt), "dd/MM/yyyy")}</DateItem>
                                </ItemList>
                            )
                        })
                    }

            </ListForms>
        </Main>
    )

    return !loading ? component : null
}