import styled from "styled-components";

export const SectionPatient = styled.section`
`

export const InputName = styled.input.attrs({ type: "text" })`
    width: 70%;
    height: 4vh;
`

export const ButtonSearch = styled.input.attrs({type: "button"})`
`

export const InputRG = styled.input.attrs({type: "text"})`
    width: 35%;
    height: 4vh;
`

export const InputCPF = styled.input.attrs({type: "text"})`
    width: 35%;
    height: 4vh;
`

export const ListShearch = styled.ul`
  display: flex;
  flex-direction: column;
  height: 40vh;
  width: 40vw;
  max-height: 40vh;
  overflow-y: scroll;
`
export const HeaderSearch = styled.li`
    display: flex;
    width: 100;
`

export const ItemSearch = styled.li`
    display: flex;
    :hover {
    background-color: #98FB98;
    cursor: default;
  };
`

export const NameItem = styled.p`
    width: 20vw;
    user-select: none;
`

export const RgItem = styled.p`
    width: 8vw;
    user-select: none;
`

export const CPFItem = styled.p`
    user-select: none;
`

export const InputSearch = styled.input.attrs({type: "text"})``