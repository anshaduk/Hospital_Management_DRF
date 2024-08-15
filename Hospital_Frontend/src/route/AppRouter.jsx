import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from '../components/User/User'
import Home from '../components/Admin/Pages/Home'
import Users from '../components/Admin/Pages/Users'
import Doctors from '../components/Admin/Pages/Doctors'
import Navbar from '../components/Admin/Pages/Navbar'
import Admin from '../components/Admin/Pages/Admin'


const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/user/home' element={<User/>} />
                <Route path='/admin' element={<Admin/>} >
                <Route path='/admin/users' element={<Users/>} />
                <Route path='/admin/doctors' element={<Doctors/>} />
                </Route>
                

              
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRouter