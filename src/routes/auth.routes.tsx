import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

export default function AuthRoutes () {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  )
}