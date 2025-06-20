import React from 'react';

const Home = ({ onRouteChange }) => {
  return (
    // Main container for the hero section, covering full viewport height (minus navbar)
    // and using the consistent dark background.
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-white p-4' 
         style={{ backgroundColor: '#1A1A2E' }}>
      
      <div className='text-center max-w-4xl mx-auto'>
        {/* Main Heading */}
        <h1 className='text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-purple-400 drop-shadow-lg'>
          Empower Ideas. Fund Futures.
        </h1>

        {/* Subtitle / Tagline */}
        <p className='text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed'>
          Decentralized Crowdfunding on NEAR Protocol.
          <br /> Support innovative projects or launch your own.
        </p>

        {/* Call to Action Buttons */}
        <div className='flex flex-col sm:flex-row justify-center gap-6'>
          <button
            onClick={() => onRouteChange('explore')}
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
          >
            Explore Campaigns
          </button>
          <button
            onClick={() => onRouteChange('create')}
            className='border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
          >
            Create Your Fund
          </button>
        </div>

        {/* Optional: Add some supporting text or a small illustration/animation */}
        <p className='text-gray-500 text-sm mt-16 max-w-2xl mx-auto'>
          Leveraging the power of NEAR Protocol for transparent and secure funding.
          Your contributions directly support innovation.
        </p>
      </div>
    </div>
  );
}

export default Home;