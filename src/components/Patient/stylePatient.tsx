import styled from "styled-components";


export const FormPatient = styled.form`
    width: 30vw;
    height: 23vh;
    background-color: orange;
    padding: 1vh 1vh 1vh 1vh;

`
export const SelectName = styled.select`
    width: 70%;
    height: 4vh;
`
export const OptionSelectName = styled.option`
    
`
export const Name = styled.input.attrs({ type: "text" })`
    width: 70%;
    height: 4vh;
`

export const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #eeeeee;
  }
`;