import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block relative w-20 h-20">
          <div className="absolute border-4 border-primary-500 border-t-transparent rounded-full w-20 h-20 animate-spin"></div>
          <div className="absolute border-4 border-accent-500 border-t-transparent rounded-full w-20 h-20 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.75s' }}></div>
        </div>
        <p className="mt-6 text-xl font-display text-gray-300">Loading Dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
