import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient.js";

const statusLabels = {
  pending: "Pending",
  preparing: "Preparing",
  "on-the-way": "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled"
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await axiosClient.get("/api/orders");
        setOrders(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!orders.length) {
    return <p>No orders have been placed yet.</p>;
  }

  return (
    <div className="page">
      <div className="card">
        <h2>All Orders</h2>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>{order.customerName}</h3>
                  <p className="muted">{order.address}</p>
                </div>
                <div className="order-meta">
                  <span className="badge">
                    {statusLabels[order.status] || order.status}
                  </span>
                  <span className="price">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    <span>
                      {item.food?.name || "Item"} x {item.quantity}
                    </span>
                    {item.food?.price && (
                      <span>
                        ${(item.food.price * item.quantity).toFixed(2)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="muted">
                Placed at:{" "}
                {new Date(order.createdAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;


