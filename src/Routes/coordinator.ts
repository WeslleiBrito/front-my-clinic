import { NavigateFunction } from 'react-router-dom';

export const goForm = (navigate: NavigateFunction, id?: string): void => {
  navigate(`/form/${id ? id : ""}`);
};