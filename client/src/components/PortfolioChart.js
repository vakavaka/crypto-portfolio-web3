import React from 'react';
import { Box } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PortfolioChart({ data }) {
  const chartData = {
    labels: data.tokens.map(token => token.symbol),
    datasets: [
      {
        data: data.tokens.map(token => token.valueUSD),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20
        }
      }
    }
  };

  return (
    <Box height="400px">
      <Pie data={chartData} options={options} />
    </Box>
  );
}

export default PortfolioChart; 