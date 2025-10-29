import React from "react";
import "../styles/gallery.css";

import gallery01 from "../assets/images/gallery-01.jpg";
import gallery02 from "../assets/images/gallery-02.jpg";
import gallery03 from "../assets/images/gallery-03.jpg";
import gallery04 from "../assets/images/gallery-04.jpg";
import gallery05 from "../assets/images/gallery-05.jpg";
import gallery06 from "../assets/images/gallery-06.jpg";
import gallery07 from "../assets/images/gallery-07.jpg";
import gallery08 from "../assets/images/gallery-08.jpg";
import gallery09 from "../assets/images/gallery-09.jpg";
import gallery10 from "../assets/images/gallery-10.jpg";
import gallery11 from "../assets/images/gallery-11.jpg";
import gallery12 from "../assets/images/gallery-12.jpg";

const Gallery = () => {
  const images = [
    gallery01,
    gallery02,
    gallery03,
    gallery04,
    gallery05,
    gallery06,
    gallery07,
    gallery08,
    gallery09,
    gallery10,
    gallery11,
    gallery12,
  ];

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <h2 className="gallery-title">Our Travel Moments</h2>
        <p className="gallery-subtitle">
          Explore some of the most beautiful destinations our travelers have
          experienced.
        </p>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <div className="gallery-item" key={index}>
              <img src={img} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
