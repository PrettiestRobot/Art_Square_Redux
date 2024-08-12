import "./FeaturedGallery.css";
import { useState, useEffect } from "react";

const FeaturedGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/artsquare-bb6b4.appspot.com/o/images%2F66b986a3955e795e09ffd24d%2F2024-08-12T03%3A52%3A58.685Z_85387071-866c-4090-a3c9-4699556355cd?alt=media&token=514baf07-1847-47cc-b0a8-abf451311079",
      title: "Band Practice",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/artsquare-bb6b4.appspot.com/o/images%2F66b9840f955e795e09ffd171%2F2024-08-12T03%3A43%3A04.911Z_d73216d0-7411-4f21-a2a7-18f949cff36a?alt=media&token=c9730fb9-8828-4846-92c7-649ad6ba9034",
      title: "We The Wild",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/artsquare-bb6b4.appspot.com/o/images%2F66b9840f955e795e09ffd171%2F2024-08-12T03%3A41%3A59.710Z_677c2ae6-f766-4317-9082-328a90ee9da2?alt=media&token=4f01dca1-cc9a-460f-8318-e7a19d746d45",
      title: "Die",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <div
          key={index}
          alt={`Slide ${index}`}
          className={`slide ${index === currentIndex ? "slide-active" : ""}`}
        >
          <div
            className={`feature-title-container ${
              index === currentIndex ? "slide-active" : ""
            }`}
          >
            <h1
              className={`feature-title ${
                index === currentIndex ? "slide-active" : ""
              }`}
            >
              {image.title}
            </h1>
          </div>

          <img
            src={image.url}
            className={`slide-img ${
              index === currentIndex ? "slide-active" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedGallery;
