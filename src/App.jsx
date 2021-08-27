import React, { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from './components/admincomponents/Users'
import Products from "./components/admincomponents/Products";
import Categories from "./components/admincomponents/Categories";
import Profile from "./components/Profile";
import Shop from "./components/Shop";
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Cart from './components/Cart'
import OrderSuccess from "./components/OrderSuccess";
import Orders from "./components/admincomponents/Orders";
import ClientOrders from "./components/ClientOrders";

function App() {
  return (
    <>
      <Search />
      
      <Router>
        <div className="main-content-wrapper d-flex clearfix ">
          <Sidebar />

          <Switch>
            <PrivateRoute path="/users" roles={["admin"]} component={Users} />
            <PrivateRoute path="/categories" roles={["admin"]} component={Categories} />
            <PrivateRoute path="/acount" roles={["admin", "client"]} component={Profile} />
            <PrivateRoute path="/orders" roles={["admin"]} component={Orders} />
            <PrivateRoute path='/ordersuccess' roles={["client"]} component={OrderSuccess} ></PrivateRoute>
            <PrivateRoute path="/products" roles={["admin"]} component={Products} />
            <PrivateRoute path="/clientorders" roles={["client"]} component={ClientOrders} />
            
            <PublicRoute restricted={true} path='/login' component={Login} ></PublicRoute>
            <PublicRoute restricted={false} path="/shop" component={Shop} />
            <PublicRoute restricted={false} path='/home' component={Home} ></PublicRoute>
            <PublicRoute restricted={false} path='/cart' component={Cart} ></PublicRoute>
            <PublicRoute restricted={true} path='/register' component={Register} ></PublicRoute>
            <PublicRoute restricted={false} path='/' component={Home} ></PublicRoute>
          </Switch>

        </div>

      </Router>

    </>
  );
}

export default App;