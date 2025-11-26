import { useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient.js";

const OrderPage = () => {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoadingFoods(true);
        const { data } = await axiosClient.get("/api/foods");
        setFoods(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load foods");
      } finally {
        setLoadingFoods(false);
      }
    };

    fetchFoods();
  }, []);

  const handleQuantityChange = (foodId, value) => {
    const qty = Number(value);
    if (Number.isNaN(qty) || qty < 0) return;
    setQuantities((prev) => ({ ...prev, [foodId]: qty }));
  };

  const selectedItems = useMemo(
    () =>
      foods
        .filter((food) => quantities[food._id] > 0)
        .map((food) => ({
          foodId: food._id,
          quantity: quantities[food._id],
          price: food.price
        })),
    [foods, quantities]
  );

  const totalPrice = useMemo(
    () =>
      selectedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [selectedItems]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    if (!selectedItems.length) {
      setError("Please select at least one food item.");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        items: selectedItems.map((item) => ({
          food: item.foodId,
          quantity: item.quantity
        })),
        totalPrice,
        customerName,
        address
      };

      await axiosClient.post("/api/orders", payload);
      setMessage("Order placed successfully.");
      setQuantities({});
      setCustomerName("");
      setAddress("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to place order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2>Place an Order</h2>

      {loadingFoods && <p>Loading foods...</p>}

      {!loadingFoods && !foods.length && (
        <p>No foods available. Please ask admin to add some items.</p>
      )}

      {!!foods.length && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Choose Items</label>
            <div className="order-food-list">
              {foods.map((food) => (
                <div key={food._id} className="order-food-row">
                  <div>
                    <strong>{food.name}</strong>
                    <span className="price">
                      ${food.price.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={quantities[food._id] || ""}
                    onChange={(e) =>
                      handleQuantityChange(food._id, e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="customerName">Your Name</label>
            <input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-row total-row">
            <span>Total:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Placing Order..." : "Place Order"}
          </button>

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default OrderPage;


