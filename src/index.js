import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import JobListings from './components/JobListings';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const container = document.getElementById('root');
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/jobs",
    element: <JobListings />,
  },
  {
    path: "/contactUs",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
