import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';

const BusyChart: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('월');

  const dataMap: Record<string, number[]> = {
    월: [0, 0, 1, 3, 5, 3, 4, 8, 7, 3, 2, 1],
    화: [0, 0, 2, 4, 5, 6, 3, 9, 5, 3, 2, 0],
    수: [1, 1, 2, 3, 4, 6, 5, 8, 6, 2, 1, 1],
    목: [0, 0, 1, 3, 4, 2, 3, 7, 5, 2, 1, 0],
    금: [0, 0, 2, 4, 6, 4, 6, 10, 8, 4, 2, 0],
    토: [1, 1, 3, 4, 5, 5, 6, 8, 7, 3, 1, 1],
    일: [0, 0, 1, 2, 3, 3, 4, 6, 5, 2, 1, 0],
  };

  const chartData: ChartData<'bar', number[], string> = {
    labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map(
      (time) => `${time}`,
    ),
    datasets: [
      {
        label: '혼잡도',
        backgroundColor: 'rgba(34, 139, 34, 0.7)',
        borderColor: 'rgba(34, 139, 34, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(34, 139, 34, 0.9)',
        hoverBorderColor: 'rgba(34, 139, 34, 1)',
        data: dataMap[selectedDay],
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <VStack spacing={4}>
      <Bar data={chartData} options={options} />

      <Flex justifyContent="center" wrap="wrap">
        {Object.keys(dataMap).map((day) => (
          <Button
            key={day}
            onClick={() => setSelectedDay(day)}
            colorScheme={selectedDay === day ? 'green' : 'gray'}
            m={1}
            size={'xs'}
          >
            {day}
          </Button>
        ))}
      </Flex>
    </VStack>
  );
};

export default BusyChart;
