import React from 'react';
import Button from '../layouts/Button';

const BookNow = ({ closeForm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 w-80 md:w-96 relative">
        <h1 className="text-2xl font-semibold text-center mb-5">Book Now</h1>
        <form className="space-y-5">
          <div className="flex flex-col">
            <input 
              type="text" 
              name="userFirstName" 
              id="userFirstName" 
              placeholder="First Name" 
              className="py-2 px-3 bg-[#d5f2ec] rounded-lg" 
            />
          </div>
          <div className="flex flex-col">
            <input 
              type="text" 
              name="userLastName" 
              id="userLastName" 
              placeholder="Last Name" 
              className="py-2 px-3 bg-[#d5f2ec] rounded-lg" 
            />
          </div>
          <div className="flex flex-col">
            <input 
              type="email" 
              name="userEmail" 
              id="userEmail" 
              placeholder="Your Email" 
              className="py-2 px-3 bg-[#d5f2ec] rounded-lg" 
            />
          </div>
          <div className="flex flex-col">
            <input 
              type="number" 
              name="userNumber" 
              id="userNumber" 
              placeholder="Phone No." 
              className="py-2 px-3 bg-[#d5f2ec] rounded-lg" 
            />
          </div>
          <div className="flex gap-4">
            <Button title='Book Appointment'/>
            <button 
              type="button" 
              className="bg-backgroundColor text-white px-5 py-2 rounded-lg hover:bg-red-500 transition-colors"
              onClick={closeForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookNow;
