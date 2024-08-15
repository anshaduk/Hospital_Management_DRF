import React from 'react';
import img from "../../assets/img/about.jpg";

const About = () => {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-4 pt-24 lg:pt-16 gap-5'>
      <div className='w-full lg:w-1/2 space-y-4'>
        <h1 className='text-4xl font-semibold text-center lg:text-left'>About Us</h1>
        <p className='text-justify lg:text-left'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur distinctio omnis vero voluptate molestias! Magnam debitis officia, error necessitatibus in, cumque mollitia distinctio recusandae libero voluptas autem quibusdam? Harum, aliquam.
        </p>
        <p className='text-justify lg:text-left'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis provident ullam dolore accusamus, quas temporibus magni repellendus maxime nostrum adipisci perspiciatis? Atque, nostrum quam. A vero ex illo nam ad?
        </p>
        <p className='text-justify lg:text-left'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, voluptatibus, assumenda eveniet eum quasi temporibus tempora non itaque porro blanditiis nihil illum placeat expedita reprehenderit vel omnis. Assumenda, voluptates corporis.
        </p>
      </div>
      <div className='w-full lg:w-1/2 flex justify-center'>
        <img src={img} alt="About Us" className='rounded-lg max-w-full h-auto' />
      </div>
    </div>
  );
};

export default About;
