import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);
    const [username,setUsername] = useState(null)
    const [doc,setDoc] = useState({doctor:{username:'', email:'', first_name:'', last_name:'' },department:'', profile_picture:'', doctor_proof:''})

    const navigate = useNavigate();

    //  Login user
    const LoginUser = async (e) => {
      
      e.preventDefault();
      try {
        let response = await axios.post('http://127.0.0.1:8000/api/token/', {
          email: e.target.email.value,
          password: e.target.password.value,
          
      }, {
          headers: {
              'Content-Type': 'application/json',
              
          },
      });
      

        let data = await response.data;
        console.log(data,"11111data");
        if (response.status === 200) {
          const decodedToken = jwtDecode(data.access);
          setUser(decodedToken);
          setAuthTokens(data);
          localStorage.setItem("authTokens", JSON.stringify(data));
          navigate(decodedToken.is_admin?'/admin':'/user/userhome')
          // navigate("/user/userhome");
        } else {
          alert("Something went wrong....!");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.detail);
        } else {
          alert('An error occurred.');
        }
      }
    };

    //Logout user
    const LogOut = () => {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      alert("Your account is Logout...");
      navigate("/user/login");
    };

    const UpdateToken = async () => {
      console.log('Token updated....!');
      
      try {
        const response = await axios('http://127.0.0.1:8000/api/token/refresh/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          data: { refresh: authTokens?.refresh },
        });
        let data = await response.data;
        if (response.status === 200) {
          setAuthTokens(data);
          setUser(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
          LogOut();
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.detail);
        } else {
          toast.error('An error occurred.');
        }
      }
    };

    useEffect(() => {
      let fourMinute = 1000 * 60 * 4;

      let interval = setInterval(() => {
        if (authTokens) {
          UpdateToken();
        }
      }, fourMinute);

      return () => clearInterval(interval); // Clean up interval on component unmount
    }, [authTokens]);


    //Doctor Detail get
    const GetDoctor = async (e) =>{
      try{
        let response = await axios.get('http://127.0.0.1:8000/api/doctorgetedit/',{
          headers: {
            'Authorization': `Bearer ${authTokens.access}`
          }
        });

        if(response.status == 200){
          setDoc(response.data)
          console.log(response.data.doctor,'lastname');
          
        }
      }catch(error){
        alert(error)
      }
    }

    let contextData = {
      LoginUser: LoginUser,
      LogOut: LogOut,
      user: user,
      authTokens: authTokens,
      doc: doc,
      setDoc:setDoc,
      GetDoctor:GetDoctor
    };

    return (
      <AuthContext.Provider value={contextData}>
        { children }
      </AuthContext.Provider>
    );
};
