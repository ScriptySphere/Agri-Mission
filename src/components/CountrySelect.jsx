import React, { useState, useMemo } from "react";
import {
  Search,
  Globe,
  Thermometer,
  CloudRain,
  Sun,
  Leaf,
  Satellite,
} from "lucide-react";

const CountrySelect = ({ countries, onSelectCountry }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return countries;

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.climate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countries, searchTerm]);

  const getClimateColor = (climate) => {
    if (climate.includes("Hot & Dry")) return "text-orange-600";
    if (climate.includes("Hot & Wet")) return "text-red-600";
    if (climate.includes("Cool")) return "text-blue-600";
    if (climate.includes("Mild & Wet")) return "text-green-600";
    if (climate.includes("Mild & Dry")) return "text-yellow-600";
    return "text-gray-600";
  };

  const getMetricColor = (type, value) => {
    switch (type) {
      case "temp":
        if (value > 30) return "text-red-600";
        if (value > 20) return "text-orange-600";
        if (value > 10) return "text-yellow-600";
        return "text-blue-600";
      case "rain":
        if (value > 1200) return "text-blue-600";
        if (value > 800) return "text-green-600";
        if (value > 400) return "text-yellow-600";
        return "text-red-600";
      case "solar":
        if (value > 200) return "text-yellow-600";
        if (value > 150) return "text-orange-600";
        return "text-gray-600";
      case "ndvi":
        if (value > 0.6) return "text-green-600";
        if (value > 0.4) return "text-yellow-600";
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 bg-pattern p-3 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Satellite
              color="#2563eb"
              className="w-8 h-8 sm:w-12 sm:h-12 text-white mr-2 sm:mr-3 animate-pulse-slow"
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
              NASA Farm Navigators
            </h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-blue-600 mb-2">
            Real-time farming with live NASA Earth data
          </p>
          <p className="text-blue-500 text-sm sm:text-base">
            Choose your farming location from anywhere in the world!
          </p>
        </div>

        <div className="card animate-slide-up">
          {/* Search Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
            <div className="flex items-center">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Choose Your Country
              </h2>
            </div>

            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search countries or climate..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base transition-colors"
                aria-label="Search countries"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Results Counter */}
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Showing {filteredCountries.length} of {countries.length} countries
            with live NASA data
          </p>

          {/* Countries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-h-[60vh] sm:max-h-96 overflow-y-auto scrollbar-hide">
            {filteredCountries.map((country, index) => (
              <div
                key={country.code}
                onClick={() => onSelectCountry(country.code)}
                className="card-hover animate-fade-in"
                style={{ animationDelay: `${Math.min(index * 50, 1000)}ms` }}
                role="button"
                tabIndex={0}
                aria-label={`Select ${country.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCountry(country.code);
                  }
                }}>
                <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1 truncate">
                  {country.name}
                </h3>

                <p
                  className={`text-xs sm:text-sm mb-3 font-medium ${getClimateColor(
                    country.climate
                  )}`}>
                  {country.climate}
                </p>

                <div className="space-y-2">
                  <div className="metric-card bg-gray-50 border-l-red-400">
                    <span className="flex items-center text-xs sm:text-sm">
                      <Thermometer className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Temperature
                    </span>
                    <span
                      className={`font-bold text-xs sm:text-sm ${getMetricColor(
                        "temp",
                        country.temperature
                      )}`}>
                      {country.temperature}°C
                    </span>
                  </div>

                  <div className="metric-card bg-gray-50 border-l-blue-400">
                    <span className="flex items-center text-xs sm:text-sm">
                      <CloudRain className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Rainfall
                    </span>
                    <span
                      className={`font-bold text-xs sm:text-sm ${getMetricColor(
                        "rain",
                        country.precipitation
                      )}`}>
                      {country.precipitation}mm
                    </span>
                  </div>

                  <div className="metric-card bg-gray-50 border-l-yellow-400">
                    <span className="flex items-center text-xs sm:text-sm">
                      <Sun className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Solar
                    </span>
                    <span
                      className={`font-bold text-xs sm:text-sm ${getMetricColor(
                        "solar",
                        country.solar
                      )}`}>
                      {country.solar} W/m²
                    </span>
                  </div>

                  <div className="metric-card bg-gray-50 border-l-green-400">
                    <span className="flex items-center text-xs sm:text-sm">
                      <Leaf className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Vegetation
                    </span>
                    <span
                      className={`font-bold text-xs sm:text-sm ${getMetricColor(
                        "ndvi",
                        country.ndvi
                      )}`}>
                      {country.ndvi}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCountries.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Globe className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg sm:text-xl mb-2">
                No countries found matching "{searchTerm}"
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                Try a different search term or climate type
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
                Clear search
              </button>
            </div>
          )}

          {/* Info Box */}
          <div className="alert-info mt-6 text-xs sm:text-sm">
            <div className="flex items-start space-x-2">
              <Satellite className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Live Data Sources:</p>
                <p className="leading-relaxed">
                  NASA POWER API provides real temperature, precipitation, and
                  solar radiation data updated daily from satellites and weather
                  stations worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySelect;
