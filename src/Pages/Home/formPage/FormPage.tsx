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
    SectionAction,
    SectionSearch,
    TypeExam
} from "./styleFormPage"
import { DataContext } from "../../../context/dataContext"
import { Form } from "../../../types/types"
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from "../../../hooks/useForm";


export const FormPage = () => {

    const context = useContext(DataContext)

    type searchMethods  = "namePatient" | "nameCompany" | "cpf" | "cnpj" | "functionPatient"
    type TOrders = "crescent" | "decrescent"
    const {forms, loading} = context

    const [listForm, setListForm] = useState<Form[]>([])
    const [typeSearchMethod, setTypeSearchMethod] = useState<searchMethods>("namePatient")
    const [order, setOrder] = useState<TOrders>("decrescent")

    useEffect(() => {

        const newList: Form[] = forms.sort((a, b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)

            if(order === "decrescent"){
                return dateB.getTime() - dateA.getTime()
            }

            if(order === "crescent"){
                return dateA.getTime() - dateB.getTime()
            }

            return 0
        })

        setListForm(newList)

    }, [forms, order])

    const [form, onChange] = useForm(
        {
            search: ""
        }
    )

    const filterListForm = (event: ChangeEvent<HTMLInputElement>) => {
        const valueSearch = event.target.value

        const newList = forms.filter((form) => {            
            return form[typeSearchMethod]?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(valueSearch.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        }).sort((a, b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)

            if(order === "decrescent"){
                return dateB.getTime() - dateA.getTime()
            }

            if(order === "crescent"){
                return dateA.getTime() - dateB.getTime()
            }

            return 0
        })


        setListForm(newList)
    }

    const handleOrder = (order: TOrders, column: searchMethods) => {
        const newOrder = listForm.sort((a, b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)

            if(order === "decrescent"){
                return dateB.getTime() - dateA.getTime()
            }

            if(order === "crescent"){
                return dateA.getTime() - dateB.getTime()
            }

            return 0
        })
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
                    <NewButton value={"Novo"}/>
                    <EditButton value={"Editar"}/>
                    <DeleteButton value={"Excluir"}/>
                </DivButtons>
            </SectionSearch>
            <ListForms>
                <ItemHeaderList>
                    <NameItem>Nome</NameItem>
                    <CompanyItem>Empresa</CompanyItem>
                    <CPFItem>CPF</CPFItem>
                    <CNPJItem>CNPJ</CNPJItem>
                    <FunctionPatientItem>Função</FunctionPatientItem>
                    <TypeExam>Tipo de Exame</TypeExam>
                    <DateItem>Dt. Criação</DateItem>
                </ItemHeaderList>
                    {
                        listForm.map((form) => {
                        
                            return(
                                <ItemList key={form.id}>
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