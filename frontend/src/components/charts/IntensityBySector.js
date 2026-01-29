import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IntensityBySector = ({ data }) => {
  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Average Intensity',
        data: data.map(item => item.avgIntensity),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `Intensity: ${context.parsed.y.toFixed(2)}`;
          },
          afterLabel: function(context) {
            const item = data[context.dataIndex];
            return `Count: ${item.count}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#9ca3af'
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        Intensity by Sector
      </h3>
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default IntensityBySector;
