'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { IntradayStockData } from '../types/IntradayStockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,zoomPlugin);

interface StockChartData {
  stockDataApiUrl: string;
  stockDataKey: string;
}

const StockChart: React.FC<StockChartData> = ({stockDataApiUrl, stockDataKey} : StockChartData) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get<IntradayStockData>(stockDataApiUrl);
        const timeSeries = response.data[stockDataKey];
        const labels = Object.keys(timeSeries);
        const closeData = Object.values(timeSeries).map(item => parseFloat(item["4. close"]));

        // Prepare the data for the chart
        setData({
          labels,
          datasets: [
            {
              label: 'Close Price',
              data: closeData,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
            },
          ]
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Line options={chartOptions} data={data} />
    </div>
  );
};

const chartOptions = {
  responsive: true,
  transitions: {
    zoom: {
      animation: {
        duration: 0
      }
    }
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: 'xy' as 'xy',
        threshold: 5
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true
        },
        mode: 'x' as 'x',
      }
    }
  }
} 

export default StockChart;
