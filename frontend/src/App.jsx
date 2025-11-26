import { Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";
import OrderPage from "./components/OrderPage.jsx";

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="logo">
          FoodNow
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/order">Place Order</NavLink>
          <NavLink to="/orders">All Orders</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} FoodNow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;


