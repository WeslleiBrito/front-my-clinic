import { ChangeEvent, useContext, useEffect, useState } from "react";
import { HeaderCNPJ, HeaderName, InputCNPJ, InputName, ItemCNPJ, ItemName, ItemShearch, ItemShearchHeader, ListShearch, SectionCompany } from "./stayleCompany";
import { ButtonSearch, InputSearch } from "../Form/styleForm";
import { CustomModal } from "../ModalSearch/ModalSearch";
import { DataContext } from '../../context/dataContext'
import { Company as CompanyType} from "../../types/types";

export const Company = (): JSX.Element | null => {

    const context = useContext(DataContext)
    const { loading, formCompany, handleFormCompany, companies, fillFormCompany} = context
    const [search, setSearch] = useState("")
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [listOpionsCompany, setListOptionsCompany] = useState<CompanyType[]>([])

    useEffect(() => {
        const list: CompanyType[] = companies.map((company) => {
            return {
                name: company.name,
                cnpj: company.cnpj,
                createdAt: company.createdAt,
                id: company.id,
                updatedAt: company.updatedAt
            }
        })

        setListOptionsCompany([...list].sort((a, b) => {

            if (a.name < b.name) {
                return - 1
            } else if (a.name > b.name) {
                return 1
            }

            return 0
        }))
    }, [companies])

    const openModal = (): void => {
        setModalIsOpen(true);
    }

    const closeModal = (): void => {
        setModalIsOpen(false);
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value)
    }

    const hanlleListCompany = (event: ChangeEvent<HTMLInputElement>): void => {
        const newName = event.target.value
        const filterList: CompanyType[] = companies.filter((company) => {
            return company.name.toLowerCase().includes(newName.toLowerCase())
        }).sort((a, b) => {

            if (a.name < b.name) {
                return - 1
            } else if (a.name > b.name) {
                return 1
            }

            return 0
        })

        setListOptionsCompany(filterList)
    }

    const selectedCompany = (id: string): void => {
        fillFormCompany(id)
        closeModal()
    }

    const component = () => {
        return (
            <SectionCompany>
                <InputName placeholder="Empresa"
                    id="nameCompany"
                    name="nameCompany"
                    value={formCompany.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleFormCompany(event) }}
                    required
                    autoComplete="off"
                />
                <ButtonSearch value={"Buscar"} onClick={openModal} />
                <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <InputSearch placeholder="Digite o nome da empresa..."
                        value={search}
                        id="searchCompany"
                        name="searchCompany"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => { handleSearch(event); hanlleListCompany(event)}}
                    />
                    {
                        !loading ? <ListShearch>
                            <ItemShearchHeader>
                                <HeaderName>Nome</HeaderName>
                                <HeaderCNPJ>CNPJ</HeaderCNPJ>
                            </ItemShearchHeader>
                            {
                                listOpionsCompany.map((item) => {
                                   
                                    return(
                                        <ItemShearch key={item.id} onDoubleClick={() => {selectedCompany(item.id)}}>
                                            <ItemName>{item.name}</ItemName>
                                            <ItemCNPJ>{item.cnpj}</ItemCNPJ>
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
                    value={formCompany.cnpj}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { handleFormCompany(event) }}
                    required
                    autoComplete="off"
                />

            </SectionCompany>
        )
    }

    return (
        component() || null
    )
}