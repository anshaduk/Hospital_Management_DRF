import React from 'react';


const Home = () => {
  return ( 
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white bg-[url('assets/img/home.png')] bg-no-repeat bg-cover opacity-90 ">
      <div className='w-full lg:w-4/5 space-y-5'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
          Empowering Health Choices for a Vibrant Life
        </h1>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quidem? Laudantium, voluptas, voluptate tempora quaerat omnis, porro soluta dignissimos illum veniam harum mollitia illo officia unde necessitatibus quasi maxime nostrum!
        </p>
        {/* <Button title="See Services" /> */}
      </div>
    </div>
  );
}

export default Home;
