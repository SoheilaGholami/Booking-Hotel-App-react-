import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { UseHotels } from "../context/HotelProvider";

function AppLayout() {
  const { hotels } = UseHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLoacations={hotels} />
    </div>
  );
}

export default AppLayout;
