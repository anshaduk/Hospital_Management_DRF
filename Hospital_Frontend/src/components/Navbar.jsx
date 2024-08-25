import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import { Link } from 'react-scroll';
// import BookNow from '../../models/BookNow';
import { Link } from 'react-router-dom';


const navigation = [
  { name: 'Home', href: '/', current: true },
  // { name: 'About Us', href: 'about', current: false },
  // { name: 'Services', href: 'services', current: false },
  // { name: 'Doctors', href: 'doctors', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const [isAuth, setIsAuth] = useState(false)

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  // Checking Access_Token is available or not
  useEffect(()=>{
    if (localStorage.getItem('access_token') !== null){
      setIsAuth(true);
    }
  },[isAuth]);

  return (
    <Disclosure as="nav" className="bg-backgroundColor w-full fixed top-0 left-0 z-50 ">
      
      {({ open }) => (
        <>
        
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-red-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h1 className="md:text-2xl font-semibold text-white sm:text-sm ml-10">WellnessVista</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                  {navigation.map((item) => (
      
                    <Link
                      key={item.name}
                      to={item.href}
                      spy={true}
                      smooth={true}
                      duration={500}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center sm:ml-auto gap-1">
                  {isAuth ?
                    <button
                    type="button"
                    className="rounded-md bg-red-900 px-4 py-1 text-white hover:bg-hoverColor transition duration-300 ease-in-out sm:text-sm"
                  >
                    Logout
                  </button>
                  :
                  <Link to='/user/login'>
                <button
                    type="button"
                    className="rounded-md bg-red-900 px-4 py-1 text-white hover:bg-hoverColor transition duration-300 ease-in-out sm:text-sm"
                  >
                    Login
                  </button>
                  </Link>
                  }
                  {/* <button
                    type="button"
                    className="rounded-md bg-red-900 px-4 py-1 text-white hover:bg-hoverColor transition duration-300 ease-in-out sm:text-sm"
                    onClick={openForm}
                  >
                    Book Now
                  </button> */}
                  {showForm && <BookNow closeForm={closeForm} />}
                  
                </div>
                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={`#${item.href}`}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
