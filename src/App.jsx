import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Router, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayouts/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./components/context/HotelProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkListProvider from "./components/context/BookmarkListProvider";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";

function App() {
  return (
    <BookmarkListProvider>
      <HotelProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmarks" element={<BookmarkLayout />}>
            <Route index element={<Bookmark />} />
            <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AddNewBookmark />} />
          </Route>
        </Routes>
      </HotelProvider>
    </BookmarkListProvider>
  );
}

export default App;
