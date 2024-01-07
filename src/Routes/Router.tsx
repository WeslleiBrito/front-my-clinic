
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../Pages/Home/HomePage'
import { Form } from '../components/Form/Form'


export const Router = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='/form' element={<Form />} />
            </Routes>
        </BrowserRouter>
    )
}