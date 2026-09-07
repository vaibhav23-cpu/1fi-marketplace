import { BrowserRouter, Routes, Route } from "react-router-dom";

import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />

        <Route
          path="/products/:slug"
          element={<ProductDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;