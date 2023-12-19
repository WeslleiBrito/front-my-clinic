import styled from "styled-components";


export const FormPatient = styled.form`
    width: 30vw;
    height: 23vh;
    background-color: orange;
    padding: 1vh 1vh 1vh 1vh;

`

export const InputName = styled.input.attrs({ type: "text" })`
    width: 70%;
    height: 4vh;
`

export const InputRG = styled.input.attrs({type: "text"})`
    width: 35%;
    height: 4vh;
`

export const InputCPF = styled.input.attrs({type: "text"})`
    width: 35%;
    height: 4vh;
`
export const InputCNPJ = styled.input.attrs({type: "text"})`
    width: 35%;
    height: 4vh;
`

export const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 4.7vh;
  left: 1vh;
`;

export const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  background-color: #AFEEEE;

  &:hover {
    background-color: #eeeeee;
  }
`;

export const SectionPatient = styled.section`
  
`
export const SectionCompany = styled.section`
  
`

export const SelectNamePatient = styled.select`
    width: 70%;
    height: 4vh;
`

export const OptionsName = styled.option`
  padding: 8px;
  cursor: pointer;
  background-color: #AFEEEE;

  &:hover {
    background-color: #eeeeee;
  }
`