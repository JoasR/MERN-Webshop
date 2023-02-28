import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";

const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={ <ProductList /> } />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" 
            element={ user ? <Navigate to="/"/> : <Login /> } 
          /> 
          <Route path="/register" 
            element={ user ? <Navigate to="/" /> : <Register /> }
          />
          <Route path="checkout-success" element={<CheckoutSuccess /> } />
          <Route path="*" element={<NotFound /> } />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;