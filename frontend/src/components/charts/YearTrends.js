import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const YearTrends = ({ data }) => {
  const chartData = data.map(item => ({
    year: item._id,
    intensity: parseFloat(item.avgIntensity.toFixed(2)),
    likelihood: parseFloat(item.avgLikelihood.toFixed(2)),
    relevance: parseFloat(item.avgRelevance.toFixed(2)),
    count: item.count
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong p-4 rounded-lg border border-white/20">
          <p className="font-semibold text-sm mb-2">Year: {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
          <p className="text-xs text-gray-400 mt-2">Records: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">📈</span>
        Trends Over Years
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="year" 
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis tick={{ fill: '#9ca3af' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line 
            type="monotone" 
            dataKey="intensity" 
            stroke="#667eea" 
            strokeWidth={3}
            dot={{ fill: '#667eea', r: 4 }}
            activeDot={{ r: 6 }}
            name="Intensity"
          />
          <Line 
            type="monotone" 
            dataKey="likelihood" 
            stroke="#43e97b" 
            strokeWidth={3}
            dot={{ fill: '#43e97b', r: 4 }}
            activeDot={{ r: 6 }}
            name="Likelihood"
          />
          <Line 
            type="monotone" 
            dataKey="relevance" 
            stroke="#f5576c" 
            strokeWidth={3}
            dot={{ fill: '#f5576c', r: 4 }}
            activeDot={{ r: 6 }}
            name="Relevance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearTrends;
