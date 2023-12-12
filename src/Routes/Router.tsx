
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../Pages/Home/HomePage'


export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}