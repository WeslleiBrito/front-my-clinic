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
`
export const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  background-color: #AFEEEE;

  &:hover {
    background-color: #eeeeee;
  }
`
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
export const SectionTypeExamAso = styled.section`
`
export const ItemTypeExam = styled.input.attrs({type: "radio"})`
`
export const LableItem = styled.label` 
`
export const SectionRiscksOccupationais = styled.section`
`
export const ItemRisckOccupational = styled.input.attrs({type: "checkbox"})`
`
export const SectionListExams = styled.section` 
`
export const ItemExamCheckbox = styled.input.attrs({type: "checkbox"})` 
`
export const InputDateExam = styled.input.attrs({type: "date"})`  
`
export const InputFunctionPatient = styled.input.attrs({type: "text"})`  
`
export const StatusPatientFit = styled.input.attrs({type: "radio"})`
`
export const StatusPatientUnfit = styled.input.attrs({type: "radio"})`
`
export const SectionFunction = styled.section`
`
export const InputComments = styled.textarea`
`
export const ButtonSubmit = styled.input.attrs({type: "submit"})`
  
`
export const ButtonNew = styled.input.attrs({type: "button"})`
`
export const ButtonEdit = styled.input.attrs({type: "button"})`
`
export const ButtonCancel = styled.input.attrs({type: "button"})`
`
export const ButtonSave = styled.button`
`

export const ButtonSearch = styled.input.attrs({type: "button"})``