import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Home from '../components/Admin/Pages/Home'
import Users from '../components/Admin/Pages/Users'
import Doctors from '../components/Admin/Pages/Doctors'
import Navbar from '../components/Admin/Pages/Navbar'
import Admin from '../components/Admin/Pages/Admin'
import Login from '../components/Login'
import Registration from '../components/Registration'
import UserHome from '../components/UserHome'
import User from '../components/User'



const AppRouter = () => {
  return (
    <div>
        
            <Routes>
                <Route path='/user/login' element={<Login/>}/>
                <Route path='/user/registration' element={<Registration/>}/>
                <Route path='/user/userhome' element={<UserHome/>}/>


                <Route path='/' element={<User/>} />
                <Route path='/admin' element={<Admin/>} >
                    <Route path='/admin/users' element={<Users/>} />
                    <Route path='/admin/doctors' element={<Doctors/>} />
                </Route>
                

              
            </Routes>
        
    </div>
  )
}

export default AppRouter