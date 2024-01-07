import { ChangeEvent, useContext, useState } from 'react'
import { DataContext } from '../../context/dataContext'
import { ButtonSearch, 
         CPFItem, 
         HeaderSearch, 
         InputCPF, 
         InputName, 
         InputRG, 
         ItemSearch, 
         ListShearch, 
         NameItem, 
         RgItem, 
         SectionPatient 
} from './stylePatient'
import { CustomModal } from '../ModalSearch/ModalSearch'


export const Patient = () => {
    const context = useContext(DataContext)

    const { loading, patients, createPatient, handleFormPatient, formPatient } = context
    const [modalIsOpen, setModalIsOpen] = useState(false)


    const [form, setForm] = useState<{ name: string, rg: string, cpf?: string }>(
        {
            name: "",
            rg: "",
            cpf: ""
        }
    )


    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const component = (): JSX.Element => {
        return(
                <SectionPatient>
                <InputName
                    placeholder="Paciente"
                    id="name"
                    name="name"
                    value={formPatient.name}
                    required
                    autoComplete="off"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleFormPatient(event)}}
                />
                <ButtonSearch value={"Buscar"} onClick={openModal} />
                <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                        <ListShearch>
                            <HeaderSearch>
                                <NameItem>Nome</NameItem>
                                <RgItem>RG</RgItem>
                                <CPFItem>CPF</CPFItem>
                            </HeaderSearch>
                            {
                                patients.map((patient) => {
                                    return(
                                        <ItemSearch key={patient.id}>
                                            <NameItem>{patient.name}</NameItem>
                                            <RgItem>{patient.rg}</RgItem>
                                            <CPFItem>{patient.cpf ? patient.cpf : ""}</CPFItem>
                                        </ItemSearch>
                                    )
                                })
                            }
                        </ListShearch>
                </CustomModal>
                <InputRG placeholder="RG"
                    id="rg"
                    name="rg"
                    value={formPatient.rg}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleFormPatient(event)}}
                    required
                    autoComplete="off"
                />
                <InputCPF placeholder="CPF"
                    id="cpf"
                    name="cpf"
                    value={formPatient.cpf || ""}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleFormPatient(event)}}
                    autoComplete="off"
                />
            </SectionPatient>
        )
    }
    
    return (
        !loading ? component() : null
    )
}
