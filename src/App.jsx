import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./starter/components/City";
import Form from "./starter/components/Form";
import { CitiesProvider } from "./context/CitiesCtx";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<CityList />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
