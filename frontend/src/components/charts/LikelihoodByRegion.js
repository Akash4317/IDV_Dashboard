import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const LikelihoodByRegion = ({ data }) => {
  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#fa709a', '#fee140'
  ];

  const chartData = data.map(item => ({
    region: item._id,
    likelihood: parseFloat(item.avgLikelihood.toFixed(2)),
    count: item.count
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong p-3 rounded-lg border border-white/20">
          <p className="font-semibold text-sm">{payload[0].payload.region}</p>
          <p className="text-sm text-gray-300">Likelihood: {payload[0].value}</p>
          <p className="text-xs text-gray-400">Count: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        Likelihood by Region
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="region" 
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: '#9ca3af', fontSize: 11 }}
          />
          <YAxis tick={{ fill: '#9ca3af' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="likelihood" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LikelihoodByRegion;
