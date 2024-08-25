import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const UserHome = () => {
  const { LogOut, user, authTokens, GetDoctor, doc, setDoc } = useContext(AuthContext);
  const [doctor, setDoctor] = useState([]);
  const navigate = useNavigate();
  let baseUrl = "http://127.0.0.1:8000/";
  const slider = useRef(null);

  useEffect(() => {
    if (user?.is_admin) {
      navigate("/admin");
    } else {
      DoctorProfile();
    }
  }, [user, navigate]);

  const DoctorProfile = async () => {
    try {
      let response;
      if (user?.is_doctor) {
        GetDoctor();
      } else {
        response = await axios.get("http://127.0.0.1:8000/api/doctor/", {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data.doctors);
          
          const verifiedDoctors = response.data.doctors.filter(
            (doctorData) => doctorData.is_verified
          );
          console.log(verifiedDoctors,'veriihiasdi');
          
          setDoctor(verifiedDoctors);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1023, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 2 } },
    ],
  };

  const handlePrevClick = () => {
    if (slider.current) {
      slider.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };
  

  return (
    <div className="min-h-screen">
      <nav className="bg-backgroundColor text-white py-4 px-5 lg:px-32 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">WellnessVista</h1>
        <div className="flex space-x-6">
          <Link to="/user/userhome" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/user/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <button onClick={LogOut} className="hover:text-gray-300">
            Logout
          </button>
        </div>
      </nav>
      <div className="flex flex-col justify-center lg:px-32 px-5 pt-16">
        <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
          <div>
            <h1 className="text-4xl font-semibold text-center lg:text-start">Our Doctors</h1>
            <p className="mt-2 text-center lg:text-start">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, quidem.
            </p>
          </div>
          <div className="flex gap-5 mt-4 lg:mt-0">
            <button
              className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
              onClick={handlePrevClick}
              disabled={!slider.current} // Disable the button if slider is not ready
            >
              <FaArrowLeft size={25} />
            </button>
            <button
              className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
              onClick={handleNextClick}
              disabled={!slider.current} // Disable the button if slider is not ready
            >
              <FaArrowRight size={25} />
            </button>
          </div>
        </div>
        {user?.is_doctor ? (
          <div className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer w-full">
            <img src={`${baseUrl + doc.profile_picture}`} alt="img" className="h-56 rounded-t-xl w-full" />
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-semibold text-xl pt-4">{doc?.doctor?.username}</h1>
              <h3 className="pt-2">{doc?.department}</h3>
            </div>
          </div>
        ) : (
          <Slider ref={slider} {...settings}>
            {doctor.map((doctorData) => (
              <div
                key={doctorData.id}
                className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer w-full"
              >
                <img src={`${baseUrl + doctorData.profile_picture}`} alt="img" className="h-56 rounded-t-xl w-full" />
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-semibold text-xl pt-4">{doctorData.doctor.username}</h1>
                  <h3 className="pt-2">{doctorData.department}</h3>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default UserHome;
