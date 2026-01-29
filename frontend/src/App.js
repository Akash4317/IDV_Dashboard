import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import FilterPanel from './components/FilterPanel';
import StatsOverview from './components/StatsOverview';
import IntensityBySector from './components/charts/IntensityBySector';
import LikelihoodByRegion from './components/charts/LikelihoodByRegion';
import RelevanceByTopic from './components/charts/RelevanceByTopic';
import CountryDistribution from './components/charts/CountryDistribution';
import YearTrends from './components/charts/YearTrends';
import PestleAnalysis from './components/charts/PestleAnalysis';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [data, setData] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });
  const [availableFilters, setAvailableFilters] = useState({
    endYears: [],
    topics: [],
    sectors: [],
    regions: [],
    pestles: [],
    sources: [],
    swots: [],
    countries: [],
    cities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://idv-dashboard-2.onrender.com';

  // Fetch available filter options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/filters`);
        setAvailableFilters(response.data);
      } catch (err) {
        console.error('Error fetching filters:', err);
      }
    };
    fetchFilters();
  }, []);

  // Fetch data and analytics based on filters
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        Object.keys(filters).forEach(key => {
          if (filters[key]) {
            params.append(key, filters[key]);
          }
        });

        const [dataResponse, analyticsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/data?${params}`),
          axios.get(`${API_URL}/api/analytics?${params}`)
        ]);

        setData(dataResponse.data);
        setAnalytics(analyticsResponse.data);
      } catch (err) {
        setError('Failed to fetch data. Please check if the backend server is running.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const updateFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      endYear: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      swot: '',
      country: '',
      city: ''
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  if (loading && !analytics) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.header 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-3">
            <span className="gradient-text">Data Insights</span>
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Global Intelligence Dashboard
          </p>
        </div>
      </motion.header>

      {error && (
        <motion.div 
          className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-red-200">{error}</p>
        </motion.div>
      )}

      {/* Filter Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <FilterPanel
          filters={filters}
          availableFilters={availableFilters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
          activeFilterCount={activeFilterCount}
        />
      </motion.div>

      {/* Stats Overview */}
      {analytics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatsOverview data={data} analytics={analytics} />
        </motion.div>
      )}

      {/* Charts Grid */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <IntensityBySector data={analytics.intensityBySector} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <LikelihoodByRegion data={analytics.likelihoodByRegion} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RelevanceByTopic data={analytics.relevanceByTopic} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <CountryDistribution data={analytics.countryDistribution} />
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <YearTrends data={analytics.yearTrends} />
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <PestleAnalysis data={analytics.pestleAnalysis} />
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <motion.footer 
        className="mt-16 text-center text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p>Data Visualization Dashboard • Built with React, MongoDB & Tailwind CSS</p>
      </motion.footer>
    </div>
  );
}

export default App;
