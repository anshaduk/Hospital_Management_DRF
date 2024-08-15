import React from 'react';

const Users = () => {
  return (
    <div className="p-6 overflow-scroll px-0">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                </svg>
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Teamlead
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                </svg>
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Function
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                </svg>
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Status
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                </svg>
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Deadline
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                </svg>
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">React Project</p>
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Start date: 10 Dec 2023</p>
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex items-center gap-3">
                <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg" alt="John Michael" className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md" />
                <div className="flex flex-col">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">John Michael</p>
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">john@creative-tim.com</p>
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex flex-col">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Manager</p>
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Organization</p>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="w-max">
                <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md" style={{ opacity: 1 }}>
                  <span>Completed</span>
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">23/04/18</p>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM12 7.5l-1.5-1.5-6 6 1.5 1.5 1.5-1.5V18h3v-6h3v6h3v-6h1.5l1.5 1.5 1.5-1.5-6-6z" />
                  </svg>
                </span>
              </button>
            </td>
          </tr>
          <tr>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">My new product</p>
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Start date: 23 Dec 2023</p>
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex items-center gap-3">
                <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg" alt="Jane Doe" className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md" />
                <div className="flex flex-col">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Jane Doe</p>
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">jane@creative-tim.com</p>
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex flex-col">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Lead</p>
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Digital</p>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="w-max">
                <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-orange-500/20 text-orange-600 py-1 px-2 text-xs rounded-md" style={{ opacity: 1 }}>
                  <span>In Progress</span>
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">23/05/23</p>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM12 7.5l-1.5-1.5-6 6 1.5 1.5 1.5-1.5V18h3v-6h3v6h3v-6h1.5l1.5 1.5 1.5-1.5-6-6z" />
                  </svg>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Users;
