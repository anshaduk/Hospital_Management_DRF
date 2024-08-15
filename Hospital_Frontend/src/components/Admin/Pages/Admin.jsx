import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Users from './Users'

const Admin = () => {
  return (
    <div>
        <Navbar/>
        <main>
            <Home/>
            <Users />
        </main>
    </div> 
    
  )
}

export default Admin