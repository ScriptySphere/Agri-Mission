import React, { useState, useEffect, useCallback } from "react";
import {
  Satellite,
  Loader2,
  AlertTriangle,
  Thermometer,
  CloudRain,
  Sun,
  Leaf,
} from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";
import CountrySelect from "./components/CountrySelect";
import CropSelect from "./components/CropSelect";
import Results from "./components/Results";
import {
  worldCountries,
  crops,
  fetchNASAData,
  generateAlerts,
  getClimateType,
} from "./utils/gameData";

const NASAFarmNavigators = () => {
  const [gameState, setGameState] = useState("loading");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [irrigation, setIrrigation] = useState(false);
  const [fertilizer, setFertilizer] = useState(false);
  const [season, setSeason] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [lastResults, setLastResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const loadCountryData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const batchSize = 8; // Reduced batch size for better mobile performance
      const countriesWithData = [];

      for (let i = 0; i < worldCountries.length; i += batchSize) {
        const batch = worldCountries.slice(i, i + batchSize);
        const batchPromises = batch.map(async (country) => {
          try {
            const nasaData = await fetchNASAData(country.lat, country.lon);
            return {
              ...country,
              ...nasaData,
              climate: getClimateType(
                nasaData.temperature,
                nasaData.precipitation
              ),
            };
          } catch (error) {
            console.warn(`Failed to load data for ${country.name}:`, error);
            // Return mock data if API fails
            return {
              ...country,
              temperature: 20 + Math.random() * 20,
              precipitation: 300 + Math.random() * 1000,
              solar: 150 + Math.random() * 100,
              ndvi: 0.3 + Math.random() * 0.5,
              climate: "Variable 🌍",
            };
          }
        });

        const batchResults = await Promise.all(batchPromises);
        countriesWithData.push(...batchResults);

        // Add delay between batches
        if (i + batchSize < worldCountries.length) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      setCountries(countriesWithData);
      setGameState("country-select");
    } catch (error) {
      console.error("Error loading country data:", error);
      setError(
        "Failed to load NASA data. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateResults = useCallback(() => {
    const country = countries.find((c) => c.code === selectedCountry);
    const crop = crops.find((c) => c.id === selectedCrop);

    let yieldScore = 100;
    let waterUsage = crop.waterNeed;
    let soilHealth = 100;
    let sustainabilityScore = 100;

    // Temperature suitability
    const tempOptimal =
      crop.optimalTemp[0] <= country.temperature &&
      country.temperature <= crop.optimalTemp[1];
    if (!tempOptimal) {
      const tempDeviation = Math.min(
        Math.abs(country.temperature - crop.optimalTemp[0]),
        Math.abs(country.temperature - crop.optimalTemp[1])
      );
      yieldScore -= tempDeviation * 2;
    }

    // Water availability
    const waterStress = country.precipitation < crop.waterNeed;
    if (waterStress && !irrigation) {
      const waterRatio = country.precipitation / crop.waterNeed;
      yieldScore *= waterRatio;
      sustainabilityScore -= 25;
    }

    // Irrigation effects
    if (irrigation) {
      if (waterStress) {
        yieldScore += 20;
        sustainabilityScore -= 15;
      } else {
        sustainabilityScore -= 20;
      }
      waterUsage += 200;
    }

    // Fertilizer effects
    if (fertilizer) {
      yieldScore += 15;
      if (selectedCrop === "soybeans") {
        sustainabilityScore -= 30;
        soilHealth -= 15;
      } else {
        sustainabilityScore -= 20;
        soilHealth -= 10;
      }
    }

    // Environmental bonuses
    const ndviBonus = country.ndvi * 30;
    yieldScore += ndviBonus;
    soilHealth += ndviBonus;

    if (country.solar > 200) {
      yieldScore += 15;
      if (selectedCrop === "sorghum") yieldScore += 10;
    }

    // Clamp values
    yieldScore = Math.max(10, Math.min(200, Math.round(yieldScore)));
    waterUsage = Math.max(100, Math.round(waterUsage));
    soilHealth = Math.max(10, Math.min(100, Math.round(soilHealth)));
    sustainabilityScore = Math.max(
      0,
      Math.min(100, Math.round(sustainabilityScore))
    );

    return {
      yield: yieldScore,
      waterUsage,
      soilHealth,
      sustainabilityScore,
      tempOptimal,
      waterStress,
      country,
      crop,
    };
  }, [countries, selectedCountry, selectedCrop, irrigation, fertilizer]);

  const generateFactCard = useCallback((results) => {
    const facts = [
      `NASA satellite data shows ${results.country.name} receives ${
        results.country.precipitation
      }mm of rain annually - that's ${
        results.country.precipitation > 1000 ? "quite wet" : "relatively dry"
      }!`,
      `The average temperature in ${results.country.name} is ${
        results.country.temperature
      }°C, making it ${
        results.country.temperature > 25
          ? "a warm"
          : results.country.temperature > 15
          ? "a temperate"
          : "a cool"
      } farming region.`,
      `Solar energy readings of ${results.country.solar} W/m² help plants photosynthesize and grow in ${results.country.name}.`,
      `The vegetation health index (NDVI) of ${
        results.country.ndvi
      } indicates ${
        results.country.ndvi > 0.6
          ? "excellent"
          : results.country.ndvi > 0.4
          ? "good"
          : "moderate"
      } growing conditions.`,
      `${results.country.name}'s ${results.country.climate} climate creates unique farming opportunities and challenges.`,
    ];

    return facts[Math.floor(Math.random() * facts.length)];
  }, []);

  const playRound = useCallback(() => {
    const results = calculateResults();
    const factCard = generateFactCard(results);
    const countryAlerts = generateAlerts(results.country);

    setLastResults({ ...results, factCard });
    setTotalScore((prev) => prev + results.sustainabilityScore);
    setAlerts(countryAlerts);
    setGameState("results");
  }, [calculateResults, generateFactCard]);

  const nextSeason = useCallback(() => {
    setSeason((prev) => prev + 1);
    setGameState("crop-select");
    setSelectedCrop(null);
    setIrrigation(false);
    setFertilizer(false);
    setAlerts([]);
  }, []);

  const resetGame = useCallback(() => {
    setGameState("country-select");
    setSelectedCountry(null);
    setSelectedCrop(null);
    setIrrigation(false);
    setFertilizer(false);
    setSeason(1);
    setTotalScore(0);
    setLastResults(null);
    setAlerts([]);
  }, []);

  const selectCountry = useCallback((countryCode) => {
    setSelectedCountry(countryCode);
    setGameState("crop-select");
  }, []);

  useEffect(() => {
    if (gameState === "loading") {
      loadCountryData();
    }
  }, [gameState, loadCountryData]);

  // Loading state
  if (gameState === "loading") {
    return (
      <LoadingScreen
        loading={loading}
        error={error}
        onRetry={() => setGameState("loading")}
      />
    );
  }

  // Country selection
  if (gameState === "country-select") {
    return (
      <CountrySelect countries={countries} onSelectCountry={selectCountry} />
    );
  }

  // Crop selection
  if (gameState === "crop-select") {
    const country = countries.find((c) => c.code === selectedCountry);

    return (
      <CropSelect
        country={country}
        season={season}
        totalScore={totalScore}
        selectedCrop={selectedCrop}
        onSelectCrop={setSelectedCrop}
        irrigation={irrigation}
        onToggleIrrigation={() => setIrrigation(!irrigation)}
        fertilizer={fertilizer}
        onToggleFertilizer={() => setFertilizer(!fertilizer)}
        onPlayRound={playRound}
        crops={crops}
      />
    );
  }

  // Results screen
  if (gameState === "results") {
    return (
      <Results
        results={lastResults}
        alerts={alerts}
        season={season}
        totalScore={totalScore}
        onNextSeason={nextSeason}
        onResetGame={resetGame}
      />
    );
  }

  // Default/error state
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-4 flex items-center justify-center">
      <div className="card max-w-md mx-auto text-center">
        <div className="text-6xl mb-4 animate-bounce-gentle">
          <Satellite className="w-16 h-16 mx-auto text-blue-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          NASA Farm Navigators
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          Real-time farming simulation with live NASA Earth data
        </p>
        <p className="text-gray-500 mb-8 text-sm">Game State: {gameState}</p>
        <button
          onClick={() => setGameState("loading")}
          className="btn-primary w-full text-base sm:text-lg">
          <Leaf className="w-5 h-5 inline mr-2" />
          Start Your Farm
        </button>
      </div>
    </div>
  );
};

export default NASAFarmNavigators;
