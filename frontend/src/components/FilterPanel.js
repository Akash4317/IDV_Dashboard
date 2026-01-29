import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FilterPanel = ({ filters, availableFilters, updateFilter, clearFilters, activeFilterCount }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const filterConfig = [
    { key: 'endYear', label: 'End Year', options: availableFilters.endYears },
    { key: 'topic', label: 'Topic', options: availableFilters.topics },
    { key: 'sector', label: 'Sector', options: availableFilters.sectors },
    { key: 'region', label: 'Region', options: availableFilters.regions },
    { key: 'pestle', label: 'PESTLE', options: availableFilters.pestles },
    { key: 'source', label: 'Source', options: availableFilters.sources },
    { key: 'swot', label: 'SWOT', options: availableFilters.swots },
    { key: 'country', label: 'Country', options: availableFilters.countries },
    { key: 'city', label: 'City', options: availableFilters.cities }
  ];

  return (
    <motion.div 
      className="glass-strong rounded-2xl p-6 mb-8"
      layout
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-display font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-all text-sm font-medium"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm font-medium"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {filterConfig.map(({ key, label, options }) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
                {label}
              </label>
              <select
                value={filters[key]}
                onChange={(e) => updateFilter(key, e.target.value)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         text-white transition-all cursor-pointer hover:bg-white/10"
              >
                <option value="" className="bg-gray-800">All {label}s</option>
                {options.map(option => (
                  <option key={option} value={option} className="bg-gray-800">
                    {option || 'Not specified'}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterPanel;
