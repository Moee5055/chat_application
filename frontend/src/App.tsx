import { Routes, Route } from "react-router";
import IndexPage from "./routes/index/IndexPage";
import LoginPage from "./routes/auth/login/LoginPage";
import AuthLayout from "./routes/auth/AuthLayout";
import SignupPage from "./routes/auth/signup/SignupPage";
import { InputOTPControlled } from "./routes/auth/verification/InputOTPControlled";
import CreateNewAccount from "./routes/auth/signup/CreateNewAccount";
import NotFoundPage from "./components/not-foundpage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="signup/verification" element={<InputOTPControlled />} />
        <Route path="signup/create-new-user" element={<CreateNewAccount />} />
      </Route>
      <Route path="/chats" element={<div>This is chat</div>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
