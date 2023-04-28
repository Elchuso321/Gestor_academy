import React from "react";
import { Carousel } from "react-bootstrap";

const images = [
  {
    src: "https://via.placeholder.com/800x500",
    alt: "First slide",
    title: "First slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    src: "https://via.placeholder.com/800x500",
    alt: "Second slide",
    title: "Second slide label",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    src: "https://via.placeholder.com/800x500",
    alt: "Third slide",
    title: "Third slide label",
    description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
  },
];

const CarouselComponent = () => {
  return (
    // <div className="d-flex align-items-center justify-content-center vh-100">
    //   <div className="container col-md-10">
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt}
            />
            <Carousel.Caption>
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
  //   </div>
  // </div>
  );
};

export default CarouselComponent;
