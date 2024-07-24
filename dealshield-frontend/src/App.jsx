import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingNavBar from "./components/LandingNavBar";
import LandingPage from "./routes/LandingPage";
import SignIn from "./routes/SignIn";
import Error from "./routes/error";
import Register from "./routes/Register";
import { loader as orderLoader } from "./routes/order";
import { loader as profileLoader } from "./routes/profile";
import { loader as disputedLoader } from "./routes/Admin/DipsutedOrders";
import { loader as paidLoader } from "./routes/Admin/PaidOrders";
import { loader as adminHomeLoader } from "./routes/Admin/admin-home";
import CompletedOrders, {
  loader as completedLoader,
} from "./routes/Admin/CompletedOrders";
import ProviderProfile, {
  loader as providerLoader,
} from "./routes/providerProfile";

import ConsumerHome from "./routes/Consumer/ConsumerHome";
import Order from "./routes/order";
import Profile from "./routes/profile";
import ProviderHome from "./routes/providerHome";
import StripeCallBack from "./routes/stripeCallback";
import AdminLogin from "./routes/Admin/login";
import AdminHome from "./routes/Admin/admin-home";
import DipsutedOrders from "./routes/Admin/DipsutedOrders";
import PaidOrders from "./routes/Admin/PaidOrders";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingNavBar />,
    errorElement: <Error />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "login",
        element: <SignIn userType="consumer" />,
      },
      {
        path: "register",
        element: <Register userType="consumer" />,
      },
      {
        path: "Consumer",
        element: <ConsumerHome />,
      },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader,
      },

      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },

      {
        path: "provider-login",
        element: <SignIn userType="provider" />,
      },
      {
        path: "provider-register",
        element: <Register userType="provider" />,
      },
      {
        path: "provider",
        element: <ProviderHome />,
      },
      {
        path: "provider/:providerId",
        element: <ProviderProfile />,
        loader: providerLoader,
      },
      {
        path: "admin",
        children: [
          { index: true, element: <AdminHome />, loader: adminHomeLoader },
          {
            path: "login",
            element: <AdminLogin />,
          },
          {
            path: "disputed-orders",
            element: <DipsutedOrders />,
            loader: disputedLoader,
          },
          {
            path: "completed-orders",
            element: <CompletedOrders />,
            loader: completedLoader,
          },
          {
            path: "paid-orders",
            element: <PaidOrders />,
            loader: paidLoader,
          },
        ],
      },
      {
        path: "stripeCallBack",
        element: <StripeCallBack />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
