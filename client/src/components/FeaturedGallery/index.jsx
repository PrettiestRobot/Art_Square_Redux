import "./FeaturedGallery.css";
import { useState, useEffect } from "react";

const FeaturedGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/artsquare-bb6b4.appspot.com/o/images%2F657167fc01d8362bba39738c%2F2023-12-07T06%3A37%3A06.205Z_5230c665-56f4-412d-984c-6f8d0691b8c1?alt=media&token=ce23afb4-f03c-406a-b803-e969c7079404",
      title: "Band Practice",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/artsquare-bb6b4.appspot.com/o/images%2F65712ea0bf130e68dc460d2a%2F2023-12-07T06%3A35%3A09.720Z_3c8e74a4-2685-427f-8d42-b756c8a1f414?alt=media&token=dcbf8bf1-4599-40dd-ba20-2f8a70babde1",
      title: "We The Wild",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/artsquare-bb6b4.appspot.com/o/images%2F65712ea0bf130e68dc460d2a%2F2023-12-07T06%3A34%3A43.125Z_7772715a-4bbf-4694-93d3-644a79b3e2fc?alt=media&token=cedacfcb-374f-4145-b9fe-ab5434509062",
      title: "Random Number Gods",
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
