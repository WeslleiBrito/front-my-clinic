
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../Pages/Home/HomePage'
import { Patient } from '../components/Patient/Patient'


export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='/form' element={<Patient />} />
            </Routes>
        </BrowserRouter>
    )
}