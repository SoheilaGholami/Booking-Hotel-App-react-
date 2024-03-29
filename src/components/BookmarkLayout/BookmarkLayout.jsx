import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function BookmarkLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLoacations={[]} />
    </div>
  );
}

export default BookmarkLayout;
