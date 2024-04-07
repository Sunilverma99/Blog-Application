import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <motion.h1 
          className="text-4xl font-bold text-center text-black dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>
        <div className='flex flex-col gap-4 lg:flex-row lg:gap-8'>
          <motion.div 
            className='w-full lg:w-1/2 rounded-lg p-4  '
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img className='w-full h-auto rounded-lg' src="https://images.pexels.com/photos/6803523/pexels-photo-6803523.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </motion.div>
          <motion.div 
            className="bg-opacity-75 p-8 w-full lg:w-1/2 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              Welcome to our blog website! We are a team of sports enthusiasts, entertainment aficionados, and news junkies passionate about sharing our insights and opinions with the world.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              Our founder, Sunil, is currently studying in IIIT Una, Himachal Pradesh. With his expertise as a full stack developer, he envisioned this platform to bring together content from various fields and provide a one-stop destination for readers seeking diverse perspectives.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              Whether you're into sports, entertainment, news, or any other field, our blog has something for everyone. We strive to deliver engaging and informative content that keeps you entertained and informed.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              Thank you for visiting our site. Feel free to explore our blog and join us on our journey!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
