import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignInSide from "./pages/sign-in";

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<SignInSide />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
    </Router>
  );
}
