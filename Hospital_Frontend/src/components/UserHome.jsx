import { useContext, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const navigation = [
  { name: 'Home', href: '/home', current: true },
  { name: 'Edit Profile', href: '/edit-profile', current: false },
  { name: 'Doctor List', href: '/doctors', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UserHome = () => {
  const { LogOut, user } = useContext(AuthContext);
  

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

      <main className="flex-grow flex items-center justify-center w-full">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {user.username}!</h2>
          <div className="text-gray-700 text-center">
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;
