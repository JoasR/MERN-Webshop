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

const App = () => {
  const user = true
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" 
            element={ user ? <Navigate to="/"/> : <Login /> } 
          /> 
          <Route path="register" 
            element={ user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;