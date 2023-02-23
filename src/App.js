import React from "react";
import "./styles/css/App.css";
import { Link } from "react-router-dom";
// Component imports
import Header from "./components/sections/Header";
import Categories from "./components/sections/Categories";
function App() {
  return (
    // index #7 layout
    <main className="App">
      <Header />
      <Categories />
    </main>
  );
}

export default App;
