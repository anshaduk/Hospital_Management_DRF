import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Registration from '../components/Registration'
import UserHome from '../components/UserHome'
import User from '../components/User'
import VerifyEmail from '../components/VerifyEmail'
import Admin from '../components/Admin'




const AppRouter = () => {
  return (
    <div>
        
            <Routes>
                <Route path='/user/login' element={<Login/>}/>
                <Route path='/user/registration' element={<Registration/>}/>
                <Route path='/user/userhome' element={<UserHome/>}/>
                <Route path='/user/verifyemail' element={<VerifyEmail/>}/>

                <Route path='/' element={<User/>} />
                <Route path='/admin' element={<Admin/>} />
            </Routes>
        
    </div>
  )
}

export default AppRouter