
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../Pages/Home/HomePage'
import { Form } from '../components/Form/Form'
import { FormPage } from '../Pages/Home/formPage/FormPage'


export const Router = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='/form/:idForm?' element={<Form />} />
                <Route path='/forms' element={<FormPage/>} />
            </Routes>
        </BrowserRouter>
    )
}