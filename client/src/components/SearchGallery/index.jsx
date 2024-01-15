import "./SearchGallery.css";
import PostCard from "../PostCard";
import Auth from "../../utils/auth";

const SearchGallery = ({ openSinglePostModal, searchResults }) => {
  const authId = Auth.loggedIn() ? Auth.getProfile()?.data?._id || "" : "";
  return (
    <>
      <div className="gallery">
        <div className="gallery-grid">
          {searchResults &&
            searchResults.map((searchResult) => (
              <div key={searchResult._id} className="gallery-item">
                <PostCard
                  postName={searchResult.postName}
                  postAuthor={searchResult.postAuthor.username}
                  postAuthorId={searchResult.postAuthor._id}
                  imageUrl={searchResult.imageUrl}
                  postId={searchResult._id}
                  authId={authId}
                  openSinglePostModal={openSinglePostModal}
                  modalPostId={searchResult._id}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchGallery;
