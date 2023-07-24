import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

const NoAuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default NoAuthRoutes;
