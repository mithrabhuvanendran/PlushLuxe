import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import GlobalProvider from "./Global/GlobalProvider";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./Components/Products/ProductDetails";
import Checkout from "./Components/Cart/Checkout";
import PaypalButton from "./Components/Cart/PaypalButton";
import OrderConfirmation from "./Pages/OrderConfirmation";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import MyOrdersPage from "./Pages/MyOrdersPage";
import AdminLayout from "./Admin/AdminLayout";
import AdminHomePage from "./Admin/AdminHomePage";
import UserManagement from "./Admin/UserManagement";
import ProductManagement from "./Admin/ProductManagement";
import EditProductPage from "./Admin/EditProductPage";
import OrderManagement from "./Admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./Components/Common/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "collections/:collection",
          element: <CollectionPage />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "order-confirmation",
          element: <OrderConfirmation />,
        },
        {
          path: "order/:id",
          element: <OrderDetailsPage />,
        },
        {
          path: "my-orders",
          element: <MyOrdersPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <AdminHomePage />,
        },
        {
          path: "users",
          element: <UserManagement />,
        },
        {
          path: "products",
          element: <ProductManagement />,
        },
        {
          path: "products/:id/edit",
          element: <EditProductPage />,
        },
        {
          path: "orders",
          element: <OrderManagement />,
        },
      ],
    },
  ]);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Provider store={store}>
        <GlobalProvider>
          <RouterProvider router={router} />
        </GlobalProvider>
      </Provider>
    </>
  );
};

export default App;
