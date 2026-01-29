import React from 'react';
import { motion } from 'framer-motion';

const StatsOverview = ({ data, analytics }) => {
  const stats = [
    {
      label: 'Total Records',
      value: data.length,
      icon: '📊',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Avg Intensity',
      value: (data.reduce((acc, item) => acc + item.intensity, 0) / data.length || 0).toFixed(1),
      icon: '⚡',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Avg Relevance',
      value: (data.reduce((acc, item) => acc + item.relevance, 0) / data.length || 0).toFixed(1),
      icon: '🎯',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      label: 'Avg Likelihood',
      value: (data.reduce((acc, item) => acc + item.likelihood, 0) / data.length || 0).toFixed(1),
      icon: '📈',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="stat-card glass rounded-xl p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl`}></div>
          <div className="relative z-10">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;
