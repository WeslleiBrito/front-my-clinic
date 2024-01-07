import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/dataContext'
import { ButtonSearch, 
         CPFItem, 
         HeaderSearch, 
         InputCPF, 
         InputName, 
         InputRG, 
         InputSearch, 
         ItemSearch, 
         ListShearch, 
         NameItem, 
         RgItem, 
         SectionPatient 
} from './stylePatient'
import { CustomModal } from '../ModalSearch/ModalSearch'
import { Patient as PatientType} from '../../types/types'


export const Patient = () => {
    const context = useContext(DataContext)

    const { loading, patients, createPatient, handleFormPatient, formPatient, fillFormPatient } = context
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [listOpionsPatients, setListOptionsPatients] = useState<PatientType[]>([])

    useEffect(() => {
        const list: PatientType[] = patients.map((patient) => {
            return {
                name: patient.name,
                rg: patient.rg,
                id: patient.id,
                cpf: patient.cpf,
                createdAt: patient.createdAt,
                updatedAt: patient.updatedAt
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

    const openModal = (): void => {
        setModalIsOpen(true);
    }

    const closeModal = (): void => {
        setModalIsOpen(false);
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value)
    }

    const hanlleListPatient = (event: ChangeEvent<HTMLInputElement>): void => {
        const newName = event.target.value
        const filterList: PatientType[] = patients.filter((patient) => {
            return patient.name.toLowerCase().includes(newName.toLowerCase())
        }).sort((a, b) => {

            if (a.name < b.name) {
                return - 1
            } else if (a.name > b.name) {
                return 1
            }

            return 0
        })

        setListOptionsPatients(filterList)
    }

    const selectedPatient = (id: string): void => {
        fillFormPatient(id)
        closeModal()
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
                        <InputSearch placeholder='Pesquise aqui...'
                            id='search'
                            name='search'
                            value={search}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {handleSearch(event); hanlleListPatient(event)}}
                        />
                        <ListShearch>
                            <HeaderSearch>
                                <NameItem>Nome</NameItem>
                                <RgItem>RG</RgItem>
                                <CPFItem>CPF</CPFItem>
                            </HeaderSearch>
                            {
                                listOpionsPatients.map((patient) => {
                                    return(
                                        <ItemSearch key={patient.id} onDoubleClick={() => {selectedPatient(patient.id)}}>
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
