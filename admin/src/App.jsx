import "./app.css"
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList"
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product"
import NewProduct from "./pages/newProduct/NewProduct"
import Login from "./pages/login/Login"
import { useEffect } from "react";

function App() {

  const user = JSON.parse(localStorage.getItem("persist:root"))?.user
  const currentUser = user && JSON.parse(user).currentUser
  const admin = currentUser?.isAdmin

  const navigate = useNavigate()

  useEffect(() => {
    if(!admin){
      navigate("/login", {replace: true })
    }
  }, [admin, navigate])

  return (
      <>
        {window.location.pathname !== '/login' && <Topbar />} {/*Do not show topbar on login page */}
        <Routes>
          <Route exact path="/login" element={ <Login /> } />
        </Routes>
        { admin && (
          <>
            <div className="container">
              <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route path="/users" element={ <UserList /> } />
                <Route path="/user/:userId" element={ <User /> } />
                <Route path="/newUser" element={ <NewUser /> }/>
                <Route path="/products" element={ <ProductList /> } />
                <Route path="/product/:productId" element={ <Product /> } />
                <Route path="/newProduct" element={ <NewProduct /> }/>
              </Routes>
            </div>
          </>
        )}
      </>
  );
}

export default App;
