'use client'
import { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'; // Use Faker for dummy data
import { Chart, LineElement, BarElement, PointElement, LineController, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
Chart.register(LineElement, BarElement, PointElement, LineController, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);


const timeOptions = [
  { label: '1 Day', value: '1d' },
  { label: '1 Week', value: '1w' },
  { label: '1 Month', value: '1m' },
];

const fetchData = () => {
  // Replace this with real API calls as needed
  // Generate random data for the sake of example
  return {
    lineData: Array.from({ length: 10 }, () => faker.number.int({ min: 0, max: 100 })), // Updated for @faker-js/faker
    pieData: [faker.number.int({ min: 10, max: 50 }), faker.number.int({ min: 10, max: 50 })],
    barData: Array.from({ length: 5 }, () => faker.number.int({ min: 0, max: 100 })),
  };
};


export default function Home() {
  const [selectedTime, setSelectedTime] = useState('1d');
  const [statsData, setStatsData] = useState<
    {
      lineData: number[];
      pieData: number[];
      barData: number[];
  }>({ lineData: [], pieData: [], barData: [] });

  useEffect(() => {
    const data = fetchData();
    setStatsData(data);
  }, [selectedTime]);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CRM Statistics</h1>
        <select
          className="border p-2 rounded"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-black shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-2xl font-bold">{Math.floor(Math.random() * 5000)}</p>
        </div>
        <div className="bg-black shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">New Customers</h2>
          <p className="text-2xl font-bold">{Math.floor(Math.random() * 200)}</p>
        </div>
        <div className="bg-black shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <p className="text-2xl font-bold">{`$${Math.floor(Math.random() * 20000)}`}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Over Time</h2>
          <Line
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
              datasets: [
                {
                  label: 'Sales',
                  data: statsData.lineData,
                  borderColor: '#6366f1',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                },
              ],
            }}
            options={{ 
              maintainAspectRatio: true,
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Segments</h2>
          <Pie
            data={{
              labels: ['New', 'Returning'],
              datasets: [
                {
                  label: 'Customer Segments',
                  data: statsData.pieData,
                  backgroundColor: ['#4ade80', '#f97316'],
                },
              ],
            }}
            options={{ 
              maintainAspectRatio: true,
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>

        <div className="col-span-1 lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <Bar
            data={{
              labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
              datasets: [
                {
                  label: 'Sales',
                  data: statsData.barData,
                  backgroundColor: '#3b82f6',
                },
              ],
            }}
            options={{ 
              maintainAspectRatio: true,
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}