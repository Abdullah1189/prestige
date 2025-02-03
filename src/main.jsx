import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import Services from "./Pages/Services.jsx";
import Signup from "./Pages/Signup.jsx";
import Profile from "./Pages/Profile.jsx";
import Login from "./Pages/Login.jsx";
import Gallery from "./Pages/Gallery.jsx";
import PrivateRoutes from "./Routes/PrivateRoutes.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import PackageDetails from "./Components/PackageDetails/PackageDetails.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import PaymentSuccess from "./Components/Checkout/PaymentSuccess.jsx";
import Bid from "./Components/PackageDetails/Bid.jsx";
import FeedbackForm from "./Pages/FeedbackForm.jsx";
import { Provider } from 'react-redux';
import store from "./redux/store.js";
import AppointmentForm from "./Components/AppointmentForm/AppointmentForm.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import Product from "./Components/Product/Product.jsx";
import ProductDetailsPage from "./Components/ProductDetailsPage/ProductDetailsPage.jsx";
import ProductCheckout from "./Components/Checkout/ProductCheckout.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      // Protected Routes (wrap with PrivateRoutes)
      {
        path: "/services",
        element: (
          <PrivateRoutes>
            <Services />
          </PrivateRoutes>
        ),
      },
      {
        path: "/appointment",
        element: (
          <PrivateRoutes>
            <AppointmentForm />
          </PrivateRoutes>
        ),
      },
      {
        path: "/services/:id",
        element: (
          <PrivateRoutes>
            <PackageDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
      },
      {
        path: "/bid",
        element: (
          <PrivateRoutes>
            <Bid />
          </PrivateRoutes>
        ),
      },
      {
        path: "/Paymentsuccess",
        element: (
          <PrivateRoutes>
            <PaymentSuccess />
          </PrivateRoutes>
        ),
      },
      
      {
        path: "/feedback",
        element: (
          <PrivateRoutes>
            <FeedbackForm />
          </PrivateRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/accessories",
        element: (
          <PrivateRoutes>
            <Product />
           </PrivateRoutes>
        ),
      },
      {
        path: "/productcheckout",
        element: (
          <PrivateRoutes>
            <ProductCheckout />
           </PrivateRoutes>
        ),
      },
      
      {
        path: "/accessories/:id",
        element: (
          <PrivateRoutes>
            <ProductDetailsPage />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}> {/* Wrap everything with Provider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
);
