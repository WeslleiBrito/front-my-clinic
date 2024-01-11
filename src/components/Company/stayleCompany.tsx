import styled from "styled-components";

export const SectionCompany = styled.section`
`
export const ItemShearchHeader = styled.li`
  display: flex;
`
export const InputName = styled.input.attrs({ type: "text" })`
    width: 70%;
    height: 4vh;
`
export const InputCNPJ = styled.input.attrs({type: "text"})`
    width: 35%;
    height: 4vh;
`

export const ListShearch = styled.ul`
  display: flex;
  flex-direction: column;
  height: 40vh;
  max-height: 40vh;
  overflow-y: scroll;
`


export const ItemShearch = styled.li`
  display: flex;
  width: 100;
  &:hover {
    background-color: #98FB98;
    cursor: default;
  }
`
export const HeaderName = styled.div`
  text-align: center;
  width: 25vw;
`
export const HeaderCNPJ = styled.div`
  text-align: center;
  width: 10vw;
`
export const ItemName = styled.div`
  width: 25vw;
  user-select: none;
`
export const ItemCNPJ = styled.div`
  text-align: center;
  width: 10vw;
  user-select: none;
`