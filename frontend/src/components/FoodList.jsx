import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient.js";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await axiosClient.get("/api/foods");
        // Ensure we always store an array to avoid runtime crashes
        setFoods(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load foods");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <p>Loading foods...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!Array.isArray(foods) || !foods.length) {
    return <p>No foods available yet. Please add some items.</p>;
  }

  return (
    <div className="card">
      <h2>Available Foods</h2>
      <div className="food-grid">
        {foods.map((food) => (
          <div key={food._id} className="food-card">
            <div className="food-header">
              <h3>{food.name}</h3>
              <span className="price">${food.price.toFixed(2)}</span>
            </div>
            {food.description && <p className="description">{food.description}</p>}
            {food.category && <p className="badge">{food.category}</p>}
            {!food.isAvailable && (
              <p className="badge badge-warning">Currently unavailable</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;


