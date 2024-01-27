import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Router, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayouts/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./components/context/HotelProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";

function App() {
  return (
    <HotelProvider>
      <Toaster />
      <Header />

      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />}></Route>
          <Route path=":id" element={<SingleHotel />}></Route>
        </Route>
      </Routes>
    </HotelProvider>
  );
}

export default App;
