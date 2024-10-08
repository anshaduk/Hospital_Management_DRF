import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

function Registration() {
  const [isDoctor, setIsDoctor] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate("/user/userhome")
    }
  },[user,navigate]);

  const UserRegister = async (e)=> {
    e.preventDefault()
    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    formData.append('password2', e.target.password2.value);
    formData.append('is_doctor',isDoctor)
  

  if(isDoctor){
    const doctor_proof = e.target.doctor_proof?.files[0];
    const profile_picture = e.target.profile_picture?.files[0];
    const department = e.target.department?.value;

    if(!profile_picture || !doctor_proof || !department){
      alert("Please upload Doctor Proof, Profle Photo and Department...")
      return
    }

    formData.append('doctor_proof', doctor_proof);
    formData.append('profile_picture', profile_picture);
    formData.append('department', department);
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', formData, {
      headers:{
        'Content-Type' : 'multipart/form-data'
      }
    });

    console.log(response);

    alert("Registration Succesfull")
    navigate("/user/verifyemail")
    
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.message?.email?.[0]
                || error.response?.data?.message?.username?.[0]
                || error.response?.data?.message?.non_field_errors?.[0]
                ||error.response?.data?.message?.password?.[0]
                || "Registration failed";
    alert(errorMessage)
  }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="mt-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <form className="space-y-6" action="#" onSubmit={UserRegister}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your username"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Doctor/Admin Checkbox */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
              <div className="flex items-center">
                <input
                  id="is_doctor"
                  name="is_doctor"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  onChange={(e) => setIsDoctor(e.target.checked)}
                />
                <label htmlFor="is_doctor" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Are you a doctor?
                </label>
              </div>

              {/* <div className="flex items-center">
                <input
                  id="is_admin"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
                <label htmlFor="is_admin" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Are you an admin?
                </label>
              </div> */}
            </div>

            {/* Doctor Fields */}
            {isDoctor && (
              <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="profile-pic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Doctor Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profile_picture"
                    id="profile-pic"
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="doctor-proof" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Doctor Proof
                  </label>
                  <input
                    type="file"
                    name="doctor_proof"
                    id="doctor-proof"
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your department"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
            </div>
          </form>

          {/* Login Button */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to='/user/login'>
            <button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Login here
            </button>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Registration;
