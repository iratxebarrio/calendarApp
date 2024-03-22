import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"


export const AppRouter = () => {

    const authStatus = 'authenticated' //validar autentcación

  return (
   <Routes>
    { 
       ( authStatus === 'not-authenticated' )
        ? <Route path='/auth/*' element={<LoginPage/>} /> /* Todas las rutas que empiecen por /auth se redirigen al LoginPage */
        : <Route path='/*' element={<CalendarPage/>} /> /* Todas las rutas que no empiecen por /auth se redirigen al CalendarPage */

    }
    <Route path='/*' element={<Navigate to='/auth/login' />} /> {/* Todas las rutas que no se reconozcan navegan a /auth/login */}

   </Routes>
  )
}
