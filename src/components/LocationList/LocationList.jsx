import React from "react";
import useFetch from "../../hooks/useFetch";

function LocationList() {
  const { data, isloading } = useFetch("http://localhost:5000/hotels", "");
  if (isloading) <p>isloading ...</p>;
  return (
    <div className="nearbyLocation">
      <h2>Nearby Location</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img alt={item.name} src={item.picture_url.url} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  &euro;&nbsp;{item.price}&nbsp;<span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
