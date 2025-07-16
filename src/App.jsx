import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./context/ProductContext";
import ChatbotWrapper from "./components/ChatbotWrapper";
import CartPage from "./components/CartPage";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <ChatbotWrapper />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <AppLayout />
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;
