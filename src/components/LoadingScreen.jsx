import React from 'react';
import { Satellite, RefreshCw, AlertCircle } from 'lucide-react';

const LoadingScreen = ({ loading, error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 bg-pattern p-4 flex items-center justify-center">
      <div className="card max-w-md mx-auto text-center animate-fade-in">
        <div className="text-6xl mb-6 animate-bounce-gentle">
          <Satellite className="w-16 h-16 mx-auto text-blue-600" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
          Loading NASA Data
        </h1>
        
        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
          Fetching real-time agricultural data from NASA POWER API for countries worldwide...
        </p>
        
        {loading && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full animate-pulse w-3/4 transition-all duration-1000"></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center">
              <div className="loading-spinner mr-2"></div>
              This may take a moment...
            </p>
          </div>
        )}
        
        {error && (
          <div className="alert-danger mb-6 animate-slide-up">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-sm sm:text-base">{error}</p>
                <button 
                  onClick={onRetry}
                  className="mt-3 inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors focus:ring-red-500"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="alert-info text-xs sm:text-sm">
          <p className="leading-relaxed">
            <strong className="flex items-center justify-center mb-2">
              <Satellite className="w-4 h-4 mr-1" />
              Live Data Sources
            </strong>
            NASA POWER API provides real temperature, precipitation, and solar radiation data updated daily from satellites and weather stations worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;