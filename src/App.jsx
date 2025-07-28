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
import Mens from "./pages/Mens";
import Womens from "./pages/Womens";
import Kids from "./pages/Kids";
import New from "./pages/New,";
import Footer from "./components/common/Footer";
import NotFound from "./components/common/NotFound";

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
        <Route path="/men" element={<Mens />} />
        <Route path="/women" element={<Womens />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/new" element={<New />} />
         <Route path="*" element={<NotFound />} />
      </Routes>

      <ChatbotWrapper />
      {!shouldHideNavbar && <Footer />}
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
