import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading: salesLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: customersLoading } = useGetUsersQuery();
  const { data: orders, isLoading: ordersLoading } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [chartData, setChartData] = useState({
    series: [{ name: "Sales", data: [] }],
    xaxis: { categories: [] },
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSales = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setChartData({
        series: [{ name: "Sales", data: formattedSales.map((item) => item.y) }],
        xaxis: { categories: formattedSales.map((item) => item.x) },
      });
    }
  }, [salesDetail]);

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false, // Hide toolbar for cleaner look
      },
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["#00E396"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Sales Trend",
      align: "left",
    },
    grid: {
      borderColor: "#ccc",
    },
    markers: {
      size: 1,
    },
    xaxis: {
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Sales",
      },
      min: 0,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  return (
    <>
      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="flex justify-between flex-wrap">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-white p-5">
              <div className="font-bold rounded-full w-[3rem] bg-blue-500 text-center p-3">
                $
              </div>
              <p className="mt-5">Sales</p>
              <h1 className="text-xl font-bold">
                {salesLoading ? <Loader /> : sales?.totalSales.toFixed(2)}
              </h1>
            </div>
            <div className="rounded-lg bg-white p-5">
              <div className="font-bold rounded-full w-[3rem] bg-teal-500 text-center p-3">
                #
              </div>
              <p className="mt-5">Customers</p>
              <h1 className="text-xl font-bold">
                {customersLoading ? <Loader /> : customers?.length}
              </h1>
            </div>
            <div className="rounded-lg bg-white p-5">
              <div className="font-bold rounded-full w-[3rem] bg-orange-500 text-center p-3">
                #
              </div>
              <p className="mt-5">All Orders</p>
              <h1 className="text-xl font-bold">
                {ordersLoading ? <Loader /> : orders?.totalOrders || 0}
              </h1>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-10">
          <Chart
            options={chartOptions}
            series={chartData.series}
            type="line"
            height={350}
          />
        </div>

        {/* Orders List */}
        <div className="mt-10">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
