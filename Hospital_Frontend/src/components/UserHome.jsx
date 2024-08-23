import { useContext, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const navigation = [
  { name: 'Home', href: '/home', current: true },
  { name: 'Edit Profile', href: '/edit-profile', current: false },
  { name: 'Doctor List', href: '/doctors', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UserHome = () => {
  const { LogOut, user, authTokens, GetDoctor, doc, setDoc } = useContext(AuthContext);
  const [doctor, setDoctor] = useState([]);
  const navigate = useNavigate();
  const baseUrl = 'http://127.0.0.1:8000/';

  const DoctorProfiles = async () => {
    try {
      let response;
      if (user?.is_doctor) {
        GetDoctor();
      } else {
        response = await axios.get(`${baseUrl}api/doctor/`, {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
        if (response.status === 200) {
          const verifiedDoctors = response.data.doctors.filter(doctorData => doctorData.is_verified);
          setDoctor(verifiedDoctors);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (user.is_admin) {
      navigate('/admin');
    } else {
      DoctorProfiles();
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Disclosure as="nav" className="bg-blue-800 w-full fixed top-0 z-50">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
              <h1 className="text-2xl font-semibold text-white">WellnessVista</h1>
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={LogOut}
                  className="bg-red-900 px-4 py-1 rounded-md text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
              <Disclosure.Button className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700">
                <span className="sr-only">Open main menu</span>
                {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
              </Disclosure.Button>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main className="flex-grow flex flex-col items-center justify-center w-full pt-20">
        {user?.is_doctor ? (
          <div className="flex flex-col items-center mt-10 w-full max-w-4xl mx-auto">
            <div className="flex w-full">
              <div className="relative w-1/2 h-80">
                <img
                  className="object-cover w-full h-full"
                  src={`${baseUrl}${doc.profile_picture}`}
                  alt="Profile"
                />
              </div>
              <div className="relative w-1/2 h-80">
                <img
                  className="object-cover w-full h-full"
                  src={`${baseUrl}${doc.doctor_proof}`}
                  alt="Doctor Proof"
                />
              </div>
            </div>
            <div className="w-full max-w-4xl mt-8">
              <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center w-full">
                  <div className="flex flex-col md:flex-row w-full p-4 bg-gray-800 rounded-lg">
                    <div className="flex-1 flex items-center justify-between p-2">
                      <p className="font-sans text-base text-white">
                        Username: <span className="uppercase font-bold">{doc?.doctor?.username}</span>
                      </p>
                      <p className="font-sans text-base text-white">
                        Email: <span className="uppercase font-medium">{doc?.doctor?.email}</span>
                      </p>
                    </div>
                    <div className="flex-1 flex items-center justify-between p-2 mt-4 md:mt-0">
                      <p className="font-sans text-base text-white">
                        Department: <span className="uppercase font-bold">{doc?.department}</span>
                      </p>
                      <p className="font-sans text-base text-white">
                        Full Name: {doc?.doctor?.first_name} {doc?.doctor?.last_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full text-center">
              <h1 className="text-xl font-bold text-gray-700 md:text-6xl">DOCTORS</h1>
            </div>

            <div className="flex justify-center mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
                {doctor.map((doctorData) => (
                  <div
                    key={doctorData.id}
                    className="relative group w-full h-80 overflow-hidden bg-black m-auto mt-4"
                  >
                    <img
                      className="object-cover w-full h-full transform duration-700 backdrop-opacity-100"
                      src={`${baseUrl}${doctorData.profile_picture}`}
                      alt="Doctor"
                    />
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                      <div className="absolute w-full flex place-content-center">
                        <p className="capitalize font-serif font-bold text-2xl text-center shadow-2xl text-black mt-10">
                          {doctorData.doctor.username}
                        </p>
                      </div>
                      <div className="absolute w-full flex place-content-center mt-20">
                        <p className="font-sans text-center w-4/5 text-white mt-5">
                          {doctorData.department}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UserHome;
