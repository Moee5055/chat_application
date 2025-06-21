import { Routes, Route } from "react-router";
import IndexPage from "./routes/index/IndexPage";
import LoginPage from "./routes/auth/login/LoginPage";
import AuthLayout from "./routes/auth/AuthLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<div>Sign up element</div>} />
      </Route>
    </Routes>
  );
}
