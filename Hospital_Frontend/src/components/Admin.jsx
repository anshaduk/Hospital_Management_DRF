import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const { user, authTokens, LogOut } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const baseUrl = 'http://127.0.0.1:8000/';

  // Define refs for sliders
  const userSlider = useRef(null);
  const doctorSlider = useRef(null);

  useEffect(() => {
    if (!user.is_admin) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [user, navigate]);

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
      setUsers(userList);
      setDoctors(doctorResponse.data.doctors);
    } catch (error) {
      alert(error);
    }
  };

  // BLOCK AND UNBLOCK USERS
  const blockUser = async (id) => {
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
      alert(error);
    }
  };

  const unblockUser = async (id) => {
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
      alert(error);
    }
  };

  // DOCTOR VERIFICATION
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
      alert(error);
    }
  };

  // TOGGLE BLOCK AND UNBLOCK
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4, // Adjust the number of slides shown at once
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center py-4 bg-gray-800 text-white px-5">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <Link to="/home" className="mr-4 bg-green-500 px-4 py-2 rounded-lg text-white">Home</Link>
          <button onClick={LogOut} className="hover:text-gray-300">Logout</button>
        </div>
      </nav>

      <div className="p-5 space-y-16">
        {/* Registered Users Section */}
        <section className="w-full">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <h2 className="text-3xl font-semibold mb-5 text-center">Registered Users</h2>
            <div className="flex justify-between mb-4">
              <button className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg" onClick={() => userSlider.current.slickPrev()}>
                <FaArrowLeft size={25} />
              </button>
              <button className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg" onClick={() => userSlider.current.slickNext()}>
                <FaArrowRight size={25} />
              </button>
            </div>
            <Slider ref={userSlider} {...settings}>
              {users.map((user, index) => (
                <div className="h-[250px] text-black rounded-xl shadow-lg mb-2 p-5" key={index}>
                  <h3 className="font-semibold text-xl mb-2">{user.username}</h3>
                  <p>{user.email}</p>
                  <p>{user.firstname} {user.lastname}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      className={`px-3 py-1 text-white rounded-lg ${user.is_active ? "bg-red-500" : "bg-green-500"}`}
                      onClick={() => toggleBlockStatus(user.id, user.is_active)}>
                      {user.is_active ? "Block" : "UnBlock"}
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Registered Doctors Section */}
        <section className="w-full">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <h2 className="text-3xl font-semibold mb-5 text-center">Registered Doctors</h2>
            <div className="flex justify-between mb-4">
              <button className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg" onClick={() => doctorSlider.current.slickPrev()}>
                <FaArrowLeft size={25} />
              </button>
              <button className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg" onClick={() => doctorSlider.current.slickNext()}>
                <FaArrowRight size={25} />
              </button>
            </div>
          
            <Slider ref={doctorSlider} {...settings}>
              {doctors?.map((doc, index) => (
                <div className="flex-shrink-0  w-full p-4" key={index}>
                  <div className="h-[300px] text-black rounded-xl shadow-lg p-5 bg-white flex flex-col items-center">
                    <img src={`${baseUrl + doc.profile_picture}`} alt="Doctor Profile" className="h-24 w-24 rounded-full mb-2" />
                    <h3 className="font-semibold text-xl mb-2 text-center">{doc.doctor.username}</h3>
                    <p className="text-center">{doc.email}</p>
                    <p className="text-center">{doc.department}</p>
                    <div className="mt-4 flex flex-col gap-3 w-full items-center">
                      <button
                        className={`px-3 py-1 text-white rounded-lg ${doc.is_active ? "bg-red-500" : "bg-green-500"}`}
                        onClick={() => toggleBlockStatus(doc.doctor.id, doc.doctor.is_active)}>
                        {doc.doctor.is_active ? "Block" : "UnBlock"}
                      </button>
                      <label className="flex items-center">
                        <input type="checkbox" checked={doc.is_verified} onChange={() => toggleVerification(doc.id, doc.is_verified)} className="mr-2" /> Is Verified
                      </label>
                      <a href={`${baseUrl + doc.doctor_proof}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Proof</a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
