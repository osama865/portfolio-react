import Blog from "./pages/blog";
import Portfolio from "./pages/portfolio";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/" element={<Portfolio />} />
    </Routes>
  );
}

export default App;
