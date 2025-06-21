import { Routes, Route } from "react-router";
import IndexPage from "./routes/index/IndexPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route
        path="/auth/login"
        element={<div>Hello this is the auth path</div>}
      />
    </Routes>
  );
}
