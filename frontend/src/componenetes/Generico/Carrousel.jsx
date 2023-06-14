import React from "react";
import { Carousel } from "react-bootstrap";


export const CarouselComponent = () => {
  const images = [
    {
      src: "https://oxford-academy.es/wp-content/uploads/2018/05/galeria-oxford-40.jpg",
      alt: " ",
      title: "  ",
      description: "",
    },
    {
      src: "https://oxford-academy.es/wp-content/uploads/2018/05/galeria-oxford-10.jpg",
      alt: "",
      title: "",
      description: "",
    },
    {
      src: "https://oxford-academy.es/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-27-at-4.02.37-PM.jpeg",
      alt: "",
      title: "",
      description: "",
    },
  ]; 
  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={image.src}>
          <div style={{ height: "100vh" }}>
            <img
              className="d-block mx-auto"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              src={image.src}
              alt={image.alt}
            />
          </div>
          <Carousel.Caption>
            <h3 className="carousel-text">{image.title}</h3>
            <p className="carousel-text">{image.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default CarouselComponent;
// const CarouselComponent = () => {
//   return (
//     // <div className="d-flex align-items-center justify-content-center vh-100">
//     //   <div className="container col-md-10">
//       <Carousel>
//         {images.map((image, index) => (
//           <Carousel.Item key={index}>
//             <img
//               className="d-block w-100"
//               src={image.src}
//               alt={image.alt}
//             />
//             <Carousel.Caption>
//               <h3>{image.title}</h3>
//               <p>{image.description}</p>
//             </Carousel.Caption>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//   //   </div>
//   // </div>
//   );
// };

// 
