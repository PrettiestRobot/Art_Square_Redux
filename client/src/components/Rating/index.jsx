import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_RATING } from "../../utils/mutations.js";
import { QUERY_POSTS, QUERY_SINGLE_POST } from "../../utils/queries.js";
import "./Rating.css";
import Auth from "../../utils/auth";

const Rating = ({ postId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [addRating] = useMutation(ADD_RATING, {
    onCompleted: (data) => {
      console.log("Mutation completed", data);
    },
    onError: (error) => {
      console.error("Mutation error", error);
    },
    refetchQueries: [
      { query: QUERY_POSTS },
      { query: QUERY_SINGLE_POST, variables: { postId: postId } },
    ],
  });

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onClick = async (index) => {
    setRating(index);
    try {
      await addRating({
        variables: {
          postId: postId,
          rating: index,
          ratingAuthor: Auth.getProfile().data._id,
        },
      });
      console.log("Rating added successfully");
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  useEffect(() => {
    console.log(rating);
  }, [rating]);

  return (
    <div className="rating-container">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`rating-item ${
            (hoverRating || rating) >= index ? "active" : ""
          }`}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
          onClick={() => onClick(index)}
        >
          {index}
        </div>
      ))}
    </div>
  );
};

export default Rating;
