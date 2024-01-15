import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_POSTS_QUERY } from "../../utils/queries";
import "./Search.css";
import SearchGallery from "../SearchGallery";
import SearchIcon from "../../assets/images/search.svg";
import Auth from "../../utils/auth";

const Search = ({ openSinglePostModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryTerm, setQueryTerm] = useState("");

  const { data, loading, error } = useQuery(SEARCH_POSTS_QUERY, {
    variables: { searchString: queryTerm },
    fetchPolicy: "no-cache",
    skip: !queryTerm,
  });

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setQueryTerm(searchTerm);
  };

  const authId = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";
  const filteredSearchResults = data?.searchPosts
    ? data.searchPosts.filter(
        (post) => post.postAuthor && post.postAuthor._id !== authId
      )
    : [];
  return (
    <div className="layout-container-column">
      <div className="layout-container">
        <div className="searchbar">
          <button className="search-button" onClick={handleSearch}>
            <img src={SearchIcon} alt="Search"></img>
          </button>
          <input
            type="text"
            placeholder="Search Art Square"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SearchGallery
          openSinglePostModal={openSinglePostModal}
          searchResults={filteredSearchResults}
        />
      )}
    </div>
  );
};

export default Search;
