import React, { useRef, useState } from "react";
import {
  HiCalendar,
  HiLocationMarker,
  HiMinus,
  HiPlay,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  createSearchParams,
  json,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  // const dateRef = useRef();
  // useOutsideClick(
  //   dateRef,
  //   () => {
  //     setOpenDate(false);
  //   },
  //   "dateDropDown"
  // );

  const handlerOptions = (name, operation) => {
    setOptions((prev) => {
      console.log("2");
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    // note => setSearchParams(encodedParams);
    navigate({ pathname: "/hotels", search: encodedParams.toString() });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <HiLocationMarker className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where to go?"
            className="headerSearchInput"
          />
        </div>
        <span className="seperator"></span>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "mm/dd/yy")} to ${format(
              date[0].endDate,
              "mm/dd/yy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              minDate={new Date()}
              className="date"
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={true}
            />
          )}
        </div>
        <span className="seperator"></span>
        <div className="headerSearchItem">
          <div
            id="optionsDropDown"
            onClick={() => setOpenOptions(!openOptions)}
          >
            {options.adult} Adult &bull; {options.children} Children &bull;{" "}
            {options.room} Room
          </div>
          {openOptions && (
            <GuestOptionsList
              options={options}
              handlerOptions={handlerOptions}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
        <span className="seperator"></span>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionsList({ options, handlerOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(
    optionsRef,
    () => {
      setOpenOptions(false);
    },
    "optionsDropDown"
  );
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        type="adult"
        options={options}
        minLimit={1}
        handlerOptions={handlerOptions}
      />
      <OptionItem
        type="children"
        options={options}
        minLimit={0}
        handlerOptions={handlerOptions}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit={1}
        handlerOptions={handlerOptions}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handlerOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handlerOptions(type, "dec")}
        >
          <HiMinus />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handlerOptions(type, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
