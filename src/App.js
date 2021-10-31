import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddBook from "./components/dashBoard/addBook/AddBook";
import ManageBook from "./components/dashBoard/manageBook/ManageBook";
import Home from "./components/home/home/Home";
import ProductDetails from "./components/home/productDetails/ProductDetails";
import CartData from "./components/home/cart/CartData";
import PrivateRoute from "./components/login/privateRoute/PrivateRoute";
import Login from "./components/login/Login.jsx";

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState({})
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <PrivateRoute path="/admin"><AddBook /></PrivateRoute>
        <Route path="/login" component={Login} />
        <Route path="/manageBook" component={ManageBook} />
        <Route path="/cart" component={CartData} />
        <Route path="/:bookId" component={ProductDetails} />
      </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
