import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
// Component imports
import App from './App';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Dashboard/Profile';

const container = document.getElementById('root');
const root = createRoot(container);
// all paths and their components for react router
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
    path: "/jobs/:id",
    element: <JobDetails />,
  },
  {
    path: "/contactUs",
    element: <Contact />,
  },
  {
    path: "/dashboard",
    element: <Profile />,
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
