import { NavigateFunction } from 'react-router-dom';

export const goForm = (navigate: NavigateFunction, idForm?: string): void => {
  navigate(`/form/${idForm ? idForm : ""}`);
};

export const goForms = (navigate: NavigateFunction): void => {
  navigate('/forms')
}