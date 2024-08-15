import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-lg">Admin Dashboard</div>
      <button className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-500">
        Logout
      </button>
    </nav>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <aside
          id="default-sidebar"
          className="fixed top-16 left-0 z-40 w-64 h-full bg-gray-50 dark:bg-gray-800 transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                    aria-hidden="true"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                    aria-hidden="true"
                  >
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM2 20a9.995 9.995 0 0 1 8-4c3.313 0 6.313 1.611 8 4H2Z" />
                  </svg>
                  <span className="ml-3">Users</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                    aria-hidden="true"
                  >
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM2 20a9.995 9.995 0 0 1 8-4c3.313 0 6.313 1.611 8 4H2Z" />
                  </svg>
                  <span className="ml-3">Doctors</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Content Area */}
        
      </div>
    </>
  );
};

export default Home;
