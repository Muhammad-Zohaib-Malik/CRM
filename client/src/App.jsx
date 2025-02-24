import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Layout from "./components/app/Layout"
import Dashboard from "./components/app/Dashboard"
import Customer from "./components/app/Customer"
import Logs from "./components/app/Logs"


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="logs" element={<Logs />} />
        </Route>
        <Route path="*" element={<h1>Not found </h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
