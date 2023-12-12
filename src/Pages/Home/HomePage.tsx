import { useContext } from "react"
import { DataContext } from "../../context/dataContext"


export const HomePage = () => {
    const context = useContext(DataContext)

    const {loading, companies} = context

    return(
        <ul>
            {
                !loading ? companies.map((company) => {
                    return(
                        <li key={company.id}>
                            <p>Nome: {company.name}</p>
                            <p>CNPJ: {company.cnpj}</p>
                            <p>Data da criação: {company.createdAt}</p>
                            <p>Data da atualização: {company.updatedAt}</p>
                        </li>
                    )
                }): <p>Carregando ...</p>
            }
        </ul>
    )
}