import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { UseHotels } from "../context/HotelProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel } = UseHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isLoadingCurrHotel || !currentHotel) return <div>loading ...</div>;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.picture_url.url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
