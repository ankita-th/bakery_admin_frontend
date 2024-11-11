import React from "react";
import basketImg from "../assets/images/cookie_img.png";
import {
  CubesCategoryIcon,
  decrease_arrowIcon,
  Increase_arrowIcon,
  ProductDocIcon,
  ProfileIcon,
} from "../assets/Icons/Svg";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(LinearScale, CategoryScale, LineElement, PointElement, Legend, Tooltip);

const Dashboard = () => {
  // Data for Sales Summary chart
  const salesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Sales',
        data: [3000, 1150, 2500, 1500, 3500],
        borderColor: '#475857',
        backgroundColor: '#475857',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const salesOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 4000,
        ticks: {
          stepSize: 1000,
          font: {
            family: 'Montserrat',
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Montserrat',
          },
        },
      },
    },
  };

  // Data for Users Summary chart
  const usersData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'This Month',
        data: [5000, 8000, 6500, 7000],
        borderColor: '#475857',
        backgroundColor: '#475857',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Last Month',
        data: [7000, 6000, 7500, 5500],
        borderColor: '#B7AE90',
        backgroundColor: '#B7AE90',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const usersOptions = {
    plugins: {
      legend: { display: true, position: 'top', labels: { usePointStyle: true } },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10000,
        ticks: {
          stepSize: 2000,
          font: {
            family: 'Montserrat',
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Montserrat',
          },
        },
      },
    },
  };

  return (
    <>
      <section className="top_cat">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
          <div className="md:col-span-3 bg-gradient-to-r from-yellow-200 to-orange-300 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center relative">
              <div className="w-full md:w-2/3">
                <div className="text-left">
                  <span className="text-lg font-semibold text-gray-700">Total Revenue</span>
                  <h2 className="text-4xl font-bold text-gray-900">$10,40,000</h2>
                </div>
                <div className="flex space-x-4 mt-4">
                  {/* Total Order Placed Card */}
                  <div className="bg-[#FAF2D5] p-4 rounded-lg flex flex-col items-start">
                    <h5 className="text-sm font-medium text-gray-600">Total Order Placed</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-3">
                      <h3 className="text-2xl font-bold text-gray-800">05</h3>
                      <div className="flex items-center text-green-600 text-sm font-semibold mt-1">
                        <span>51%</span>
                        {Increase_arrowIcon}
                      </div>
                    </div>
                  </div>
                  {/* Total Customers Card */}
                  <div className="bg-[#FAF2D5] p-4 rounded-lg flex flex-col items-start">
                    <h5 className="text-sm font-medium text-gray-600">Total Customers</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-3">
                      <h3 className="text-2xl font-bold text-gray-800">200</h3>
                      <div className="flex items-center text-red-600 text-sm font-semibold mt-1">
                        <span>20%</span>
                        {decrease_arrowIcon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Image Section */}
              <div className="w-1/3 hidden md:block image_total_revenue">
                <img src={basketImg} alt="Basket of bread" className="w-full rounded-lg" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-4">
            {/* Total Products Card */}
            <div className="bg-[#FFEFE7] rounded-lg p-6 flex flex-col justify-between relative">
              <div>
                <h2 className="text-black font-semibold text-lg">Total Products</h2>
                <p className="text-4xl font-bold text-black">50</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-3">
                  <p className="text-red-500 mt-2">10 Today’s Products added</p>
                  <div className="mt-4 flex items-center text-red-500">
                    <span className="text-sm">+2% Past month</span>
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 dashcat_icons">
                {ProductDocIcon}
              </div>
            </div>

            {/* Categories and Total Users Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Categories Card */}
              <div className="bg-[#E8F0FB] rounded-lg p-6 relative">
                <h2 className="text-black font-semibold text-lg">Categories</h2>
                <p className="text-4xl font-bold text-black">10</p>
                <div className="flex justify-end mt-4 dashcat_icons">
                  {CubesCategoryIcon}
                </div>
              </div>
              {/* Total Users Card */}
              <div className="bg-[#FDEBF9] rounded-lg p-6 relative">
                <h2 className="text-black font-semibold text-lg">Total Users</h2>
                <p className="text-4xl font-bold text-black">20</p>
                <div className="flex justify-end mt-4 dashcat_icons">
                  {ProfileIcon}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="inventory_Dash mt-5">
        <h3>Inventory Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-3">
          <div className="bg-[#FFEFE7] p-4 rounded-lg flex flex-col items-start gap-4">
            <h5 className="text-sm font-medium text-gray-600">Total Running Orders</h5>
            <h3 className="text-2xl font-bold text-gray-800 mt-3">250</h3>
          </div>

          <div className="bg-[#FFEFE7] p-4 rounded-lg flex flex-col items-start gap-4">
            <h5 className="text-sm font-medium text-gray-600">Low Stock Items</h5>
            <h3 className="text-2xl font-bold text-gray-800 mt-3">120</h3>
          </div>

          <div className="bg-[#FFEFE7] p-4 rounded-lg flex flex-col items-start gap-4">
            <h5 className="text-sm font-medium text-gray-600">In Progress Orders</h5>
            <h3 className="text-2xl font-bold text-gray-800 mt-3">120</h3>
          </div>

          <div className="bg-[#FFEFE7] p-4 rounded-lg flex flex-col items-start gap-4">
            <h5 className="text-sm font-medium text-gray-600">Today’s Order Value</h5>
            <h3 className="text-2xl font-bold text-gray-800 mt-3">$140k</h3>
          </div>
        </div>
      </section>

      <section className="graph_dash mt-5">
        <div className="flex gap-4">
          {/* Sales Summary Card */}
          <div className="bg-white rounded-lg p-6 shadow-md w-1/2">
            <h2 className="text-gray-600 font-semibold">Sales Summary</h2>
            <p className="text-3xl font-bold text-gray-900">6,345 <span className="text-gray-500 text-sm font-normal">1.3% VS LAST WEEK</span></p>
            <div className="mt-4">
              <Line data={salesData} options={salesOptions} />
            </div>
          </div>

          {/* Users Summary Card */}
          <div className="bg-white rounded-lg p-6 shadow-md w-1/2">
            <h2 className="text-gray-600 font-semibold">Users Summary</h2>
            <p className="text-3xl font-bold text-gray-900">9,845 <span className="text-gray-500 text-sm font-normal">past 30 days</span></p>
            <div className="mt-4">
              <Line data={usersData} options={usersOptions} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
