import { useNavigate, useParams } from "react-router-dom";
import { UseBookmark } from "../context/BookmarkListProvider";
import { useEffect } from "react";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, isLoadingCurrBookmark, currentBookmark } = UseBookmark();
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadingCurrBookmark || !currentBookmark) return <div>loading ...</div>;
  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        {" "}
        &larr; &nbsp; BACK
      </button>
      <h2>{currentBookmark.cityName}</h2>
    </div>
  );
}

export default SingleBookmark;
