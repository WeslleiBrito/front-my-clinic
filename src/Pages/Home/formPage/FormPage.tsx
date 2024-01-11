import { useContext, useEffect, useState } from "react"
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
    SectionSearch
} from "./styleFormPage"
import { DataContext } from "../../../context/dataContext"
import { Form } from "../../../types/types"
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const FormPage = () => {

    const context = useContext(DataContext)

    type searchMethods  = "name" | "company" | "cpf" | "cnpj" | "function"
    type TOrders = "crescent" | "decrescent"
    const {forms, loading} = context

    const [listForm, setListForm] = useState<Form[]>([])
    const [typeSearchMethod, setTypeSearchMethod] = useState<searchMethods>("name")
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

    const component = (
        <Main>
            <SectionSearch>
                <DivOptions>
                    <Lable>
                        <OptiosRadios/>
                        Nome
                    </Lable>
                    <Lable>
                        <OptiosRadios/>
                        Empresa
                    </Lable>
                    <Lable>
                        <OptiosRadios/>
                        CPF
                    </Lable>
                    <Lable>
                        <OptiosRadios/>
                        CNPJ
                    </Lable>
                </DivOptions>
                <InputSearch/>
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
                    <DateItem>Dt. Criação</DateItem>
                    <CPFItem>CPF</CPFItem>
                    <CNPJItem>CNPJ</CNPJItem>
                    <FunctionPatientItem>Função</FunctionPatientItem>
                </ItemHeaderList>
                    {
                        listForm.map((form) => {
                            const date = new Date(form.createdAt)
                            const year = date.getFullYear()
                            const month = String(date.getMonth() + 1).startsWith('0', 1)
                            const day = String(date.getDate).startsWith('0', 1)
                            console.log(date);
                            
                            console.log(date.getMilliseconds());
                            
                            return(
                                <ItemList key={form.id}>
                                    <NameItem>{form.namePatient}</NameItem>
                                    <CompanyItem>{form.nameCompany}</CompanyItem>
                                    <CPFItem>{form.cpf}</CPFItem>
                                    <CNPJItem>{form.cnpj}</CNPJItem>
                                    <FunctionPatientItem>{form.functionPatient}</FunctionPatientItem>
                                    <DateItem>{format(date, "dd/MM/yyyy")}</DateItem>
                                </ItemList>
                            )
                        })
                    }

            </ListForms>
        </Main>
    )

    return !loading ? component : null
}