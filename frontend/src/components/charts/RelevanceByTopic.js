import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RelevanceByTopic = ({ data }) => {
  const chartData = data.map(item => ({
    topic: item._id.length > 15 ? item._id.substring(0, 15) + '...' : item._id,
    fullTopic: item._id,
    relevance: parseFloat(item.avgRelevance.toFixed(2)),
    count: item.count
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong p-3 rounded-lg border border-white/20">
          <p className="font-semibold text-sm">{payload[0].payload.fullTopic}</p>
          <p className="text-sm text-gray-300">Relevance: {payload[0].value}</p>
          <p className="text-xs text-gray-400">Count: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        Relevance by Topic
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={chartData} 
          layout="vertical"
          margin={{ left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis type="number" tick={{ fill: '#9ca3af' }} />
          <YAxis 
            dataKey="topic" 
            type="category"
            width={120}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="relevance" 
            fill="url(#colorGradient)" 
            radius={[0, 8, 8, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f093fb" />
              <stop offset="100%" stopColor="#f5576c" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RelevanceByTopic;
