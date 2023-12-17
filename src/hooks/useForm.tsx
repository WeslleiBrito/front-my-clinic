import { ChangeEvent, useState } from 'react';

export const useForm = <T extends Record<string, string>>(initialState: T) => {
    const [form, setForm] = useState<T>(initialState);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const onItemClick = (input: {[key: string]: string | undefined}[]) => {
        
        input.forEach(item => {
            Object.entries(item).forEach((obj) => {
                const [keyObj, value] = obj
                setForm((prevForm) => ({...prevForm, [keyObj]: value || ""}))
            })
        })
    }

    const clearForm = () => {
        const clearedForm = Object.fromEntries(
            Object.keys(form).map((key) => [key, ''])
        ) as T;

        setForm(clearedForm);
    };

    return [form, onChange, onItemClick, clearForm] as const;
};
