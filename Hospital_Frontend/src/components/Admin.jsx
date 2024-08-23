import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Admin = () => {

  const handleLogout = ()=>{
    
  }  
  const [users, setUsers] = useState([
    { username: "user1", email: "user1@example.com", firstname: "John", lastname: "Doe", isBlocked: false },
    { username: "user2", email: "user2@example.com", firstname: "Jane", lastname: "Smith", isBlocked: false },
  ]);

  const [doctors, setDoctors] = useState([
    { username: "doc1", email: "doc1@example.com", department: "Cardiology", isBlocked: false, isAdmin: false, profilePic: "/src/assets/img/doc1.jpg", doctorProof: "/src/assets/proof/doc1-proof.jpg" },
    { username: "doc2", email: "doc2@example.com", department: "Neurology", isBlocked: false, isAdmin: false, profilePic: "/src/assets/img/doc2.jpg", doctorProof: "/src/assets/proof/doc2-proof.jpg" },
  ]);

  const toggleUserBlock = (index) => setUsers(users.map((user, i) => i === index ? { ...user, isBlocked: !user.isBlocked } : user));
  const toggleDoctorBlock = (index) => setDoctors(doctors.map((doctor, i) => i === index ? { ...doctor, isBlocked: !doctor.isBlocked } : doctor));
  const toggleDoctorAdmin = (index) => setDoctors(doctors.map((doctor, i) => i === index ? { ...doctor, isAdmin: !doctor.isAdmin } : doctor));

  const userSlider = useRef(null);
  const doctorSlider = useRef(null);
  const settings = { dots: true, infinite: true, speed: 500, arrows: false, slidesToShow: 3, responsive: [{ breakpoint: 1024, settings: { slidesToShow: 2 } }, { breakpoint: 768, settings: { slidesToShow: 1 } }] };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center py-4 bg-gray-800 text-white px-5">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
            <Link to="/home" className="mr-4 bg-green-500 px-4 py-2 rounded-lg text-white">Home</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg text-white">Logout</button>
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
                    <label>
                      <input type="checkbox" checked={user.isBlocked} onChange={() => toggleUserBlock(index)} /> Block/Unblock
                    </label>
                    <button className="bg-red-500 px-3 py-1 text-white rounded-lg">Delete</button>
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
              {doctors.map((doctor, index) => (
                <div className="h-[400px] text-black rounded-xl shadow-lg mb-2 p-5" key={index}>
                  <img src={doctor.profilePic} alt="Doctor Profile" className="h-24 w-24 rounded-full mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-2">{doctor.username}</h3>
                  <p>{doctor.email}</p>
                  <p>{doctor.department}</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <label>
                      <input type="checkbox" checked={doctor.isBlocked} onChange={() => toggleDoctorBlock(index)} /> Block/Unblock
                    </label>
                    <label>
                      <input type="checkbox" checked={doctor.isAdmin} onChange={() => toggleDoctorAdmin(index)} /> Allow Admin
                    </label>
                    <a href={doctor.doctorProof} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Proof</a>
                    <button className="bg-red-500 px-3 py-1 text-white rounded-lg">Delete</button>
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
