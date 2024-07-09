import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import CartIcon from './components/CartIcon';
import Cart from './components/Cart';
import Login from './components/Login';
import LoginAPI from './components/LoginAPI';
import Register from './components/Register';
import Logout from './components/Logout';
import './App.css';

const App = () => {
  const user = useSelector((state) => state.auth ? state.auth.user : null);

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Simple Store</h1>
          <nav>
            <Link to="/">Products</Link>
            <Link to="/cart">
              <CartIcon />
            </Link>
            {user ? (
              <>
                <span className="welcome-message">Welcome, {user.email}!</span>
                <Logout />
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/login-api">Login with API</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={user ? <Cart /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-api" element={<LoginAPI />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;