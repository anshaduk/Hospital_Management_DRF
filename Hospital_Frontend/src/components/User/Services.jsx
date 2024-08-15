import React from 'react'
import Button from '../../layouts/Button'
import ServicesCard from '../../layouts/ServicesCard'
import { RiMicroscopeLine } from 'react-icons/ri'
import { MdHealthAndSafety } from 'react-icons/md'
import { FaHeartbeat } from 'react-icons/fa'

const Services = () => {
    const icon1 = <RiMicroscopeLine size={35} className='text-backgroundColor' />
    const icon2 = <MdHealthAndSafety size={35} className='text-backgroundColor' />
    const icon3 = <FaHeartbeat />
  return (
    <div className='min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16'>
        <div className='flex flex-col items-center lg:flex-row justify-between'>
            <div>
            <div className="w-[80%] mx-auto lg:mx-0">
                <h1 className='text-4xl font-semibold text-center lg:text-start'>Our Services</h1>
            </div>

                <div className="w-[100%]">
                <p className='mt-2 text-center lg:text-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum autem, veritatis iusto voluptates molestiae qui, recusandae dignissimos obcaecati aliquid eum rerum, consectetur fuga nostrum. Alias blanditiis temporibus omnis maxime quaerat.</p>
                </div>
            </div>
            <div className='mt-4 w-[30%] text-end'>
                <Button title = "See Services" />
            </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-5 pt-14'>
            <ServicesCard icon={icon1} title="Lab Test"/>
            <ServicesCard icon={icon2} title="Health Check"/>
            <ServicesCard icon={icon3} title="Heart Health"/>
        </div>
    </div>
  )
}

export default Services
