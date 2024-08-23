import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router';


const Admin = () => {
  const navigate = useNavigate()
    const { authTokens, user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const baseUrl = 'http://127.0.0.1:8000/';

    const fetchData = async () => {

        try {
            const [userResponse, doctorResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/admin/', {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                }),
                axios.get('http://127.0.0.1:8000/api/doctor/', {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                }),
            ]);

            const userList = userResponse.data.filter(user => !user.is_doctor && !user.is_admin && !user.allow_admin);
            const adminList = userResponse.data.filter(user => user.is_admin || user.allow_admin);
            // console.log(adminList);

            setAdmins(adminList)
            setUsers(userList);
            setDoctors(doctorResponse.data.doctors);
        } catch (error) {
            console.log(error);
        }
    };
    // admin verification
    const updateAdminStatus = async (id, isAdmin) => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/admin/${id}/`, {
                is_admin: isAdmin
            }, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                    'Content-Type': 'application/json'
                }
            });

            setAdmins(prevAdmins =>
                prevAdmins.map(admin =>
                    admin.id === id ? { ...admin, is_admin: isAdmin } : admin
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const toggleAdminStatus = (id, currentStatus) => {
        updateAdminStatus(id, !currentStatus);
    };

    const blockUser = async (id) => {
        console.log(id, 'emailllllllllllllllll');
        try {
            await axios.patch(`http://127.0.0.1:8000/api/admin/${id}/`, {
                action: 'block'
            }, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                    'Content-Type': 'application/json'
                }
            });

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === id ? { ...user, is_active: false } : user
                )
            );

            setDoctors(prevDoctors =>
            prevDoctors.map(doctor =>
                doctor.doctor.id === id ? { ...doctor, doctor: { ...doctor.doctor, is_active: false } } : doctor
            )
        );

        } catch (error) {
            console.log(error);
        }
    };

    const unblockUser = async (id) => {
        console.log(id, 'emailllllllllllllllll');

        try {
            await axios.patch(`http://127.0.0.1:8000/api/admin/${id}/`, {
                action: 'unblock'
            }, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                    'Content-Type': 'application/json'
                }
            });
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === id ? { ...user, is_active: true } : user
                )
            );
            setDoctors(prevDoctors =>
                prevDoctors.map(doctor =>
                    doctor.doctor.id === id ? { ...doctor, doctor: { ...doctor.doctor, is_active: true } } : doctor
                )
            );
        } catch (error) {
            console.log(error);
        }
    };



    // Dovtor verification
    const updateDoctorVerification = async (id, isVerified) => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/doctor/${id}/`, {
                is_verified: isVerified
            }, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                    'Content-Type': 'application/json'
                }
            });
            setDoctors(prevDoctors =>
                prevDoctors.map(doctor =>
                    doctor.id === id ? { ...doctor, is_verified: isVerified } : doctor
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    // TOGGLES 
    const toggleBlockStatus = (id, isActive) => {
        if (isActive) {
            blockUser(id);
        } else {
            unblockUser(id);
        }
    };
    const toggleVerification = (id, currentStatus) => {
        updateDoctorVerification(id, !currentStatus);
    };

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        if (!user.is_admin) {
            navigate('/');
        } else {
            fetchData();
        }
    }, [user, navigate]);

    return (
        <>

            <div className="w-full text-center mb-4">
                <h1 className="text-xl font-bold text-gray-950 md:text-6xl">ADMIN</h1>
            </div>

            <div className="flex flex-wrap">
                {/* DOCTORS SECTION */}
                <div className="w-full md:w-1/2 p-2">
                    <div className="bg-gray-900 rounded-2xl bg-opacity-45 backdrop-blur-sm shadow">
                        <div className="w-full text-center">
                            <h1 className="text-xl font-bold text-gray-300 md:text-4xl">DOCTORS</h1>
                        </div>
                        <div className="flex flex-wrap">
                            {doctors?.map((doc) => (
                                <div key={doc.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/2 p-2">
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <div className="flex flex-col items-center">
                                            <div className="flex justify-between w-full">
                                                <img className="w-24 h-20 mb-2 rounded-md shadow-md" src={`${baseUrl + doc.profile_picture}`} alt="Doctor Image 1" />
                                                <img
                                                    onClick={() => openModal(`${baseUrl + doc.doctor_proof}`)}
                                                    className="w-24 h-20 mb-2 rounded-md shadow-md cursor-pointer"
                                                    src={`${baseUrl + doc.doctor_proof}`}
                                                    alt="Doctor Image 2"
                                                />
                                            </div>
                                            <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-white uppercase">{doc.doctor.username}</h5>
                                            <span className="text-xs font-semibold text-gray-200 uppercase">DEPARTMENT : {doc.department}</span>
                                            <span className="text-xs font-semibold text-gray-200">EMAIL : {doc.doctor.email}</span>
                                            <div className="flex items-center justify-between mt-2 w-full">
                                                <input
                                                    type="checkbox"
                                                    checked={doc.is_verified}
                                                    onChange={() => toggleVerification(doc.id, doc.is_verified)}
                                                    className="mr-2"
                                                />
                                                {doc.doctor.is_active ? (
                                                    <button
                                                        onClick={() => toggleBlockStatus(doc.doctor.id, doc.doctor.is_active)}
                                                        className="py-1 text-xs font-mono px-3 text-gray-100 focus:outline-none bg-yellow-700 hover:bg-red-600 hover:text-black rounded-md"
                                                    >
                                                        BLOCK
                                                    </button>
                                                )

                                                    : (
                                                        <button
                                                            onClick={() => toggleBlockStatus(doc.doctor.id, doc.doctor.is_active)}
                                                            // {...console.log(doc.doctor.id,'iddddddddddd')}
                                                            
                                                            className="py-1 text-xs font-mono px-3 text-black focus:outline-none bg-red-600 hover:text-black rounded-md"
                                                        >
                                                            UNBLOCK
                                                        </button>

                                                    )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* USERS SECTION */}
                <div className="w-full md:w-1/2 p-2">
                    <div className="bg-gray-900 rounded-2xl bg-opacity-45 backdrop-blur-sm shadow">
                        <div className="w-full text-center">
                            <h1 className="text-xl font-bold text-gray-300 md:text-4xl">USERS</h1>
                        </div>
                        <div className="flex flex-wrap">
                            {users.map((user) => (
                                <div key={user.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/2 p-2">
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <div className="flex flex-col items-center">
                                            <img className="w-24 h-20 mb-2 rounded-full shadow-md" src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg" alt="User Profile" />
                                            <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-white">{user.username}</h5>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">User</span>
                                            <div className="flex mt-2">
                                            {user.is_active ? (
                                                <button
                                                onClick={() => toggleBlockStatus(user.id, user.is_active)}
                                                className="py-1 text-xs font-mono px-3 text-gray-100 focus:outline-none bg-yellow-700 hover:bg-red-600 hover:text-black rounded-md"
                                            >
                                                BLOCK
                                            </button>
                                            ) : (
                                                <button
                                                    onClick={() => toggleBlockStatus(user.id, user.is_active)}
                                                    className="py-1 text-xs font-mono px-3 text-black focus:outline-none bg-red-600 hover:text-black rounded-md"
                                                >
                                                    UNBLOCK
                                                </button>
                                            )}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* NEW CATEGORY SECTION */}
                <div className="w-full p-2">
                    <div className="bg-gray-900 rounded-2xl bg-opacity-45 backdrop-blur-sm shadow">
                        <div className="w-full text-center">
                            <h1 className="text-xl font-bold text-gray-300 md:text-4xl">ADMINS</h1>
                        </div>
                        <div className="flex flex-wrap">
                            {admins.map((item) => (
                                <div key={item.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-2">
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <div className="flex flex-col items-center">
                                            <img className="w-24 h-20 mb-2 rounded-full shadow-md" src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg" />
                                            <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-white">{item.username}</h5>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.email}</span>
                                            <div className="flex mt-2">
                                                {item.allow_admin && (
                                                    <>
                                                        <input
                                                            type="checkbox"
                                                            checked={item.is_admin}
                                                            onChange={() => toggleAdminStatus(item.id, item.is_admin)}
                                                            className="mr-2"
                                                        />
                                                        <label className='text-white font-semibold'>Verify?</label>
                                                    </>
                                                )}

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative">
                        <img className="w-1/3 max-h-1/3 mx-auto" src={selectedImage} alt="Full-size" />
                        <button
                            className="absolute top-1 right-1 text-red-500 bg-gray-50 hover:bg-red-700 rounded-full text-2xl font-bold"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Admin