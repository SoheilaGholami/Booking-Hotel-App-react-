import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";
function HotelProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates-gta=${room || 1}`
  );
  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error.massage);
      setIsLoadingCurrHotel(false);
    }
  }

  return (
    <HotelsContext.Provider
      value={{ isLoading, hotels, getHotel, isLoadingCurrHotel, currentHotel }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelProvider;

export function UseHotels() {
  return useContext(HotelsContext);
}
