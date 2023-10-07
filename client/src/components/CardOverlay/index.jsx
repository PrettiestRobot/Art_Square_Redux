import "./CardOverlay.css";

import ProfileImage from "../../assets/images/profile.jpg";

const CardOverlay = ({ postName, postAuthor }) => {
  return (
    <div className="card-overlay">
      <a href="" className="card-user-info">
        <div className="card-user-image">
          <img src={ProfileImage}></img>
        </div>
        <div className="card-user-username">{postAuthor}</div>
      </a>
    </div>
  );
};

export default CardOverlay;
