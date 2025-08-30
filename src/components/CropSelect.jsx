import React from "react";
import {
  Leaf,
  Droplets,
  Beaker,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  Tractor,
} from "lucide-react";
import { generateAlerts } from "../utils/gameData";

const CropSelect = ({
  country,
  season,
  totalScore,
  selectedCrop,
  onSelectCrop,
  irrigation,
  onToggleIrrigation,
  fertilizer,
  onToggleFertilizer,
  onPlayRound,
  crops,
}) => {
  const countryAlerts = generateAlerts(country);

  const getCropSuitability = (crop) => {
    const tempMatch =
      crop.optimalTemp[0] <= country.temperature &&
      country.temperature <= crop.optimalTemp[1];
    const waterMatch = country.precipitation >= crop.waterNeed * 0.7;

    if (tempMatch && waterMatch)
      return { level: "excellent", color: "green", icon: Star };
    if (tempMatch || waterMatch)
      return { level: "good", color: "yellow", icon: CheckCircle };
    return { level: "challenging", color: "red", icon: XCircle };
  };

  const getAlertIcon = (alert) => {
    switch (alert.type) {
      case "rain":
        return "🌧️";
      case "drought":
        return "☀️";
      case "earthquake":
        return "⚠️";
      case "heat":
        return "🔥";
      case "cold":
        return "❄️";
      default:
        return "📢";
    }
  };

  const getAlertBorderColor = (severity) => {
    switch (severity) {
      case "danger":
        return "border-red-500";
      case "warning":
        return "border-yellow-500";
      default:
        return "border-blue-500";
    }
  };

  const getAlertBgColor = (severity) => {
    switch (severity) {
      case "danger":
        return "bg-red-50";
      case "warning":
        return "bg-yellow-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 bg-pattern p-3 sm:p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
            <Leaf className="w-6 h-6 sm:w-8 sm:h-8 inline mr-2" />
            Season {season} - Choose Your Crop
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-blue-600 mb-2">
            Farming in {country.name}
          </p>
          <p className="text-blue-500 text-sm sm:text-base">
            Sustainability Score: {totalScore} points
          </p>
        </div>

        {/* Alerts Section */}
        {countryAlerts.length > 0 && (
          <div className="card mb-4 sm:mb-6 animate-slide-up">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500" />
              Weather & Risk Alerts
            </h2>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {countryAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg border-l-4 ${getAlertBorderColor(
                    alert.severity
                  )} ${getAlertBgColor(alert.severity)}`}>
                  <div className="flex items-start space-x-3">
                    <span className="text-xl sm:text-2xl flex-shrink-0">
                      {getAlertIcon(alert)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">
                        {alert.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className="card animate-slide-up"
          style={{ animationDelay: "200ms" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
            <Leaf className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" />
            Choose Your Crop
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Select the best crop for {country.name}'s {country.climate} climate
          </p>

          {/* Crops Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {crops.map((crop, index) => {
              const suitability = getCropSuitability(crop);
              const SuitabilityIcon = suitability.icon;

              return (
                <div
                  key={crop.id}
                  onClick={() => onSelectCrop(crop.id)}
                  className={`cursor-pointer p-4 sm:p-6 border-3 rounded-xl transition-all hover:shadow-lg transform hover:scale-105 animate-fade-in ${
                    selectedCrop === crop.id
                      ? "border-green-500 bg-green-50 shadow-lg scale-105"
                      : "border-gray-200 hover:border-green-400 hover:bg-green-50"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${crop.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectCrop(crop.id);
                    }
                  }}>
                  <div className="text-3xl sm:text-4xl mb-3 text-center">
                    {crop.icon}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-center mb-2">
                    {crop.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 leading-relaxed">
                    {crop.description}
                  </p>

                  <div className="space-y-2">
                    <div className="metric-card bg-gray-50 border-l-red-400 flex flex-col">
                      <span className="text-xs sm:text-sm">Optimal Temp:</span>
                      <span
                        className={`font-medium text-xs sm:text-sm ${
                          crop.optimalTemp[0] <= country.temperature &&
                          country.temperature <= crop.optimalTemp[1]
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                        {crop.optimalTemp[0]}-{crop.optimalTemp[1]}°C
                      </span>
                    </div>

                    <div className="metric-card bg-gray-50 border-l-blue-400 flex flex-col">
                      <span className="text-xs sm:text-sm">Water Need:</span>
                      <span
                        className={`font-medium text-xs sm:text-sm ${
                          country.precipitation >= crop.waterNeed * 0.7
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                        {crop.waterNeed}mm/year
                      </span>
                    </div>

                    <div
                      className={`text-center p-2 rounded font-medium text-xs sm:text-sm flex items-center justify-center ${
                        suitability.level === "excellent"
                          ? "bg-green-100 text-green-800"
                          : suitability.level === "good"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      <SuitabilityIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {suitability.level === "excellent"
                        ? "Excellent Match"
                        : suitability.level === "good"
                        ? "Good Match"
                        : "Challenging"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Farm Management */}
          {selectedCrop && (
            <div className="border-t-2 pt-6 animate-slide-up">
              <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-center flex items-center justify-center">
                <Tractor className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                Farm Management Decisions
              </h3>
              <p className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base">
                Choose your farming strategy - each decision affects your
                results!
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Irrigation */}
                <div
                  onClick={onToggleIrrigation}
                  className={`cursor-pointer p-4 sm:p-6 border-3 rounded-xl transition-all hover:shadow-lg transform hover:scale-105 ${
                    irrigation
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${
                    irrigation ? "Disable" : "Enable"
                  } irrigation system`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onToggleIrrigation();
                    }
                  }}>
                  <div className="flex items-center justify-center mb-3">
                    <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
                    <span className="font-bold text-lg sm:text-xl">
                      Irrigation System
                    </span>
                  </div>
                  <p className="text-center text-gray-600 mb-2 font-medium">
                    {irrigation ? "✅ ACTIVATED" : "❌ OFF"}
                  </p>
                  <p className="text-xs sm:text-sm text-center leading-relaxed">
                    {irrigation
                      ? "Extra water supply but uses more resources"
                      : "Rely on natural rainfall - eco-friendly but risky"}
                  </p>
                  {country.precipitation < 500 && (
                    <div className="mt-2 p-2 bg-orange-50 border-l-4 border-orange-400 rounded">
                      <p className="text-xs text-orange-700 text-center font-medium">
                        ⚠️ Recommended for this dry climate
                      </p>
                    </div>
                  )}
                </div>

                {/* Fertilizer */}
                <div
                  onClick={onToggleFertilizer}
                  className={`cursor-pointer p-4 sm:p-6 border-3 rounded-xl transition-all hover:shadow-lg transform hover:scale-105 ${
                    fertilizer
                      ? "border-orange-500 bg-orange-50 shadow-lg"
                      : "border-gray-200 hover:border-orange-400 hover:bg-orange-50"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${
                    fertilizer ? "Disable" : "Enable"
                  } chemical fertilizer`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onToggleFertilizer();
                    }
                  }}>
                  <div className="flex items-center justify-center mb-3">
                    <Beaker className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mr-2 sm:mr-3" />
                    <span className="font-bold text-lg sm:text-xl">
                      Chemical Fertilizer
                    </span>
                  </div>
                  <p className="text-center text-gray-600 mb-2 font-medium">
                    {fertilizer ? "✅ APPLIED" : "❌ NATURAL"}
                  </p>
                  <p className="text-xs sm:text-sm text-center leading-relaxed">
                    {fertilizer
                      ? "Higher yield but environmental impact"
                      : "Natural growth - better for soil health"}
                  </p>
                  {selectedCrop === "soybeans" && fertilizer && (
                    <div className="mt-2 p-2 bg-orange-50 border-l-4 border-orange-400 rounded">
                      <p className="text-xs text-orange-700 text-center font-medium">
                        ⚠️ Soybeans naturally fix nitrogen - less needed
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={onPlayRound}
                className="btn-primary w-full text-lg sm:text-xl py-4">
                <Leaf className="w-5 h-5 inline mr-2" />
                Start Growing Season {season}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropSelect;
