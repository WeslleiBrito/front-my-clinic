import styled from 'styled-components'

interface ItemListProps {
    $isActive: boolean;
}

export const Main = styled.main``

export const SectionSearch = styled.section``

export const DivOptions = styled.div``

export const OptiosRadios = styled.input.attrs({type: 'radio'})``

export const Lable = styled.label``

export const InputSearch = styled.input.attrs({type: 'text'})``

export const SectionAction = styled.section``

export const DivButtons = styled.div``

export const NewButton = styled.input.attrs({type: 'button'})``

export const EditButton = styled.input.attrs({type: 'button'})``

export const DeleteButton = styled.input.attrs({type: 'button'})``

export const ListForms = styled.ul``

export const ItemHeaderList = styled.li`
    display: flex;
    
`

export const ItemList = styled.li<ItemListProps>`
    display: flex;
    
    background-color: ${({ $isActive }) => ($isActive ? '#49c5b6' : 'transparent')};
`

export const NameItem = styled.p`
    width: 20vw;
    user-select: none;
    
`

export const CompanyItem = styled.p`
    width: 23vw;
    user-select: none;
    
`
export const CPFItem = styled.p`
    width: 8vw;
    user-select: none;
    
`

export const CNPJItem = styled.p`
    width: 10vw;
    user-select: none;
    
`

export const FunctionPatientItem = styled.p`
    width: 15vw;
    user-select: none;
    
`

export const TypeExam = styled.p`
    width: 13vw;
    user-select: none;
    
`
export const DateItem = styled.p`
`
export const CheckedFormItem = styled.input.attrs({type: "checkbox"})``


