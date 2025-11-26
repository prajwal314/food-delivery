import { useState } from "react";
import axiosClient from "../api/axiosClient.js";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: ""
};

const AddFood = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        ...form,
        price: Number(form.price)
      };

      await axiosClient.post("/api/foods", payload);
      setMessage("Food item added successfully.");
      setForm(initialForm);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add food item.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2>Add Food (Admin UI)</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Margherita Pizza"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Classic pizza with fresh mozzarella and basil"
            rows={3}
          />
        </div>

        <div className="form-row">
          <label htmlFor="price">Price (USD)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="9.99"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Pizza"
          />
        </div>

        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Add Food"}
        </button>

        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default AddFood;


