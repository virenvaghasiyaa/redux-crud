import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
