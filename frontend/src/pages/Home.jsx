import { Link } from "react-router-dom";
import FoodList from "../components/FoodList.jsx";
import AddFood from "../components/AddFood.jsx";

const Home = () => {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <h1>Order delicious food in minutes</h1>
          <p>
            FoodNow lets you browse a curated list of dishes, place orders, and
            manage everything from a clean web dashboard.
          </p>
          <div className="hero-actions">
            <Link to="/order" className="btn-primary">
              Place an Order
            </Link>
            <Link to="/orders" className="btn-secondary">
              View All Orders
            </Link>
          </div>
        </div>
      </section>

      <div className="grid-2">
        <FoodList />
        <AddFood />
      </div>
    </div>
  );
};

export default Home;


