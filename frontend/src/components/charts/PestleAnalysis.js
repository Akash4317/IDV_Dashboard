import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PestleAnalysis = ({ data }) => {
  const chartData = data.map(item => ({
    pestle: item._id,
    intensity: parseFloat(item.avgIntensity.toFixed(2)),
    relevance: parseFloat(item.avgRelevance.toFixed(2)),
    count: item.count
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong p-3 rounded-lg border border-white/20">
          <p className="font-semibold text-sm mb-2">{payload[0].payload.pestle}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
          <p className="text-xs text-gray-400 mt-1">Records: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">🔍</span>
        PESTLE Analysis
      </h3>
      <div className="text-sm text-gray-400 mb-4">
        Political, Economic, Social, Technological, Legal, Environmental factors
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="pestle" 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 'auto']}
            tick={{ fill: '#9ca3af' }}
          />
          <Radar 
            name="Intensity" 
            dataKey="intensity" 
            stroke="#667eea" 
            fill="#667eea" 
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Radar 
            name="Relevance" 
            dataKey="relevance" 
            stroke="#f5576c" 
            fill="#f5576c" 
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PestleAnalysis;
