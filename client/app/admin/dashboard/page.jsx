"use client";
import React, { useEffect } from "react";
import "./dashboard.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { getAdminProducts } from "@/store/actions/productAction.jsx";
import { getAllOrders } from "@/store/actions/orderAction.jsx";
import { getAllUsers } from "@/store/actions/userAction.jsx";
import FormatPrice from "@/utils/functions/FormatPrice.jsx";
import MetaData from "@/utils/Meta/MetaData";
import isAuth from "@/Auth/isAuth";
import Sidebar from "@/components/dashboard/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <section className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Link href="/admin/dashboard">
          <h1 className="text-4xl text-center">Dashboard</h1>
        </Link>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> <FormatPrice price={totalAmount} />
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link href="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link href="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link href="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="flex items-center w-[80%] mx-auto">
          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default isAuth(AdminDashboard, true);
