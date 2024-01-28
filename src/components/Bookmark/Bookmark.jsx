import ReactCountryFlag from "react-country-flag";
import { UseBookmark } from "../context/BookmarkListProvider";
import { Link } from "react-router-dom";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark } = UseBookmark();
  if (isLoading) return <div>is loading</div>;
  console.log(currentBookmark?.id);
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList"></div>
      {bookmarks.map((item) => {
        return (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              key={item.id}
              className={`bookmarkItem  ${
                item.id === currentBookmark?.id ? "current-bookmark" : ""
              }`}
            >
              <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp;&nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
              <span>{item.country}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Bookmark;
