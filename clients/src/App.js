import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./layouts/NotFound";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
