import React from 'react'
import heroImg from "../../assets/look-studio-zRX4M-9YiP4-unsplash.jpg"
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <>
        <section className='relative'>
            <img src={heroImg} alt="" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center text-white p-6'>
                    <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>Vacation <br /> Ready</h1>
                    <p className='text-sm tracking-tighter md:text-lg mb-6'>
                        Explore our vacation-ready outfits with fast worldwide shipping.
                    </p>
                    <NavLink to={"/collections/all"} className="bg-white text-gray-900 px-6 py-2 rounded-sm text-lg hover:bg-[#d73b5a] hover:text-white">Shop Now</NavLink>
                </div>
            </div>
        </section>
    </>
  )
}

export default Hero