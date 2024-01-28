import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  return (
    <div>
      <h2>Add new Bookmark</h2>
      <form action="" className="form">
        <div className="formControl">
          <label htmlFor="cityName">city name</label>
          <input type="text" name="cityName" id="cityName" />
        </div>
        <div className="formControl">
          <label htmlFor="country">country</label>
          <input type="text" name="country" id="country" />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; BACK
          </button>
          <button className="btn btn--primary">ADD</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
