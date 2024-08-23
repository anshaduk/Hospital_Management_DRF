import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

function VerifyEmail() {
    const navigate = useNavigate();

    const handleVerification = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', e.target.email.value);
        formData.append('code', e.target.code.value);
        console.log(e.target.code.value);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/verifyemail/', formData);
            toast.success(response?.data?.message);
            navigate('/user/login');
        } catch (error) {
            toast.error(error.response?.data?.message);

        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-3 lg:py-0">
                <div className="w-full max-w-sm bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-50 dark:border-gray-700">
                    <div className="p-2 space-y-2 md:space-y-4 sm:p-8">
                        <h1 className="text-3xl font-bold text-center text-gray-600 md:text-2xl dark:text-gray-100">
                            Verify Email
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleVerification}>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="number"
                                    name="code"
                                    id="code"
                                    className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Code"
                                    required
                                />
                            </div>
                            <div className='flex justify-around'>
                                <p onClick={() => navigate('/user/login')} className="cursor-pointer hover:text-gray-300 text-white font-medium">
                                    Sign In
                                </p>
                                <p onClick={() => navigate('/user/registration')} className="cursor-pointer hover:text-gray-300 text-white font-medium">
                                    Sign Up
                                </p>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gray-500 bg-opacity-70 text-gray-400 hover:bg-gray-900 hover:text-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600">
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyEmail;