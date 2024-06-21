import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./starter/components/City";
import Form from "./starter/components/Form";
import { CitiesProvider } from "./context/CitiesCtx";
// import { AuthProvider } from "./context/AuthContext";
import Protect from "./starter/components/Protect";
import SpinnerFullPage from "./starter/components/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    // <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Homepage />} />

            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <Protect>
                  <AppLayout />
                </Protect>
              }
            >
              <Route index element={<CityList />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
    // </AuthProvider>
  );
}

export default App;
