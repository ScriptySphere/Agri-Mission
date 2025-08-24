import React from 'react';
import { Trophy, TrendingUp, Droplets, Heart, Leaf, Globe, Satellite, RotateCcw, ArrowRight, Target } from 'lucide-react';

const Results = ({ results, alerts, season, totalScore, onNextSeason, onResetGame }) => {
  const getScoreColor = (score, type = 'default') => {
    if (type === 'yield') {
      if (score >= 150) return 'text-green-600';
      if (score >= 100) return 'text-yellow-600';
      return 'text-red-600';
    }
    
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score, type = 'default') => {
    if (type === 'yield') {
      if (score >= 150) return 'bg-green-50 border-green-500';
      if (score >= 100) return 'bg-yellow-50 border-yellow-500';
      return 'bg-red-50 border-red-500';
    }
    
    if (score >= 80) return 'bg-green-50 border-green-500';
    if (score >= 60) return 'bg-yellow-50 border-yellow-500';
    return 'bg-red-50 border-red-500';
  };

  const getAlertIcon = (alert) => {
    switch (alert.type) {
      case 'rain': return '🌧️';
      case 'drought': return '☀️';
      case 'earthquake': return '⚠️';
      case 'heat': return '🔥';
      case 'cold': return '❄️';
      default: return '📢';
    }
  };

  const getAlertColors = (severity) => {
    switch (severity) {
      case 'danger': return 'bg-red-50 border-red-500 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      default: return 'bg-blue-50 border-blue-500 text-blue-800';
    }
  };

  const getTip = (sustainabilityScore) => {
    if (sustainabilityScore > 80) {
      return 'Excellent sustainable farming! You\'re protecting the environment while maintaining good yields.';
    }
    if (sustainabilityScore > 60) {
      return 'Good job! Try reducing water usage or using fewer chemicals next time for even better sustainability.';
    }
    return 'Consider more eco-friendly practices like natural fertilizers and water conservation for better long-term results.';
  };

  const averageScore = Math.round(totalScore / season);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 bg-pattern p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center justify-center">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-yellow-300" />
            Season {season} Results
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white">
            Your Farm Performance Report
          </p>
        </div>
        
        {/* Regional Alerts */}
        {alerts.length > 0 && (
          <div className="card mb-4 sm:mb-6 animate-slide-up">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-red-500" />
              Regional Alerts
            </h2>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {alerts.map((alert, index) => (
                <div 
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg border-l-4 ${getAlertColors(alert.severity)}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl sm:text-2xl flex-shrink-0">
                      {getAlertIcon(alert)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-sm sm:text-base">
                        {alert.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Performance Metrics */}
          <div className="card animate-slide-up">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
              Farm Performance
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div className={`metric-card ${getScoreBg(results.yield, 'yield')}`}>
                <div>
                  <span className="font-bold text-base sm:text-lg">Crop Yield</span>
                  <p className="text-xs sm:text-sm text-gray-600">How much you harvested</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl sm:text-3xl font-bold ${getScoreColor(results.yield, 'yield')}`}>
                    {results.yield}%
                  </span>
                  {results.yield > 100 && (
                    <p className="text-xs text-green-600 font-medium">Above average!</p>
                  )}
                </div>
              </div>
              
              <div className="metric-card bg-blue-50 border-blue-500">
                <div>
                  <span className="font-bold text-base sm:text-lg">Water Used</span>
                  <p className="text-xs sm:text-sm text-gray-600">Total water consumption</p>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    {results.waterUsage}mm
                  </span>
                  <div className="flex items-center mt-1">
                    <Droplets className="w-3 h-3 mr-1 text-blue-500" />
                    <span className="text-xs text-blue-600">
                      {results.waterUsage > 800 ? 'High' : results.waterUsage > 500 ? 'Moderate' : 'Low'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={`metric-card ${getScoreBg(results.soilHealth)}`}>
                <div>
                  <span className="font-bold text-base sm:text-lg">Soil Health</span>
                  <p className="text-xs sm:text-sm text-gray-600">Long-term soil condition</p>
                </div>
                <div className="text-right">
                  <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(results.soilHealth)}`}>
                    {results.soilHealth}%
                  </span>
                  <div className="flex items-center justify-end mt-1">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    <span className="text-xs text-gray-600">
                      {results.soilHealth > 80 ? 'Healthy' : results.soilHealth > 60 ? 'Good' : 'Needs care'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={`metric-card border-2 ${getScoreBg(results.sustainabilityScore)}`}>
                <div>
                  <span className="font-bold text-lg sm:text-xl">Sustainability Score</span>
                  <p className="text-xs sm:text-sm text-gray-600">Environmental friendliness</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl sm:text-3xl font-bold ${getScoreColor(results.sustainabilityScore)}`}>
                    {results.sustainabilityScore}/100
                  </span>
                  <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        results.sustainabilityScore > 80 ? 'bg-green-500' :
                        results.sustainabilityScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${results.sustainabilityScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-base sm:text-lg text-gray-800 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Total Score
                </span>
                <span className="text-xl sm:text-2xl font-bold text-purple-600">
                  {totalScore} points
                </span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                <p>Across {season} season{season > 1 ? 's' : ''}</p>
                <p>Average: {averageScore} points per season</p>
                <div className="flex items-center mt-2">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    averageScore > 80 ? 'bg-green-500' :
                    averageScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium">
                    {averageScore > 80 ? 'Expert Farmer!' :
                     averageScore > 60 ? 'Good Farmer' : 'Learning Farmer'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* NASA Insights */}
          <div className="card animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Satellite className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
              NASA Earth Science Insights
            </h2>
            
            <div className="alert-info mb-4 sm:mb-6">
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600" />
                <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
                  {results.factCard}
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4 sm:mb-6">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                Data Sources:
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span>Temperature from NASA POWER meteorological data</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span>Precipitation from satellite observations</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span>Vegetation index calculated from climate data</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span>Solar radiation from weather stations</span>
                </div>
              </div>
            </div>
            
            <div className="alert-info">
              <div className="flex items-start space-x-3">
                <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">
                    Farming Tip:
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {getTip(results.sustainabilityScore)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Climate Summary */}
            <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <h4 className="font-bold text-sm mb-2 text-gray-800">
                {results.country.name} Climate Summary:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-600">Climate:</span>
                  <span className="font-medium ml-1">{results.country.climate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Crop:</span>
                  <span className="font-medium ml-1">{results.crop.name} {results.crop.icon}</span>
                </div>
                <div>
                  <span className="text-gray-600">Season:</span>
                  <span className="font-medium ml-1">{season}</span>
                </div>
                <div>
                  <span className="text-gray-600">NDVI:</span>
                  <span className="font-medium ml-1">{results.country.ndvi}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
          <button 
            onClick={onNextSeason}
            className="btn-primary flex items-center justify-center text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
          >
            <Leaf className="w-5 h-5 mr-2" />
            Continue to Season {season + 1}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          
          <button 
            onClick={onResetGame}
            className="btn-secondary flex items-center justify-center text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Choose New Country
            <Globe className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;