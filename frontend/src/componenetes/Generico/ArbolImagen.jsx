import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export const ArbolDeFotos = () => {
  const imagenes = [
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2018/05/galeria-oxford-12.jpg",
    },
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-27-at-4.02.37-PM.jpeg",
    },
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2018/05/galeria-oxford-6.jpg",
    },
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2018/05/galeria-oxford-49.jpg",
    },
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2019/02/52536858_1224099554438406_8222240328665530368_n.jpg",
    },
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2019/02/47687309_1176541439194218_8740292931652419584_n.jpg",
    },
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2019/02/45180255_1146456375536058_8123112895790710784_n.jpg",
    },
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2019/02/45213287_1147099498805079_138399239439908864_n.jpg",
    },
    {
      nombre: "",
      url: "https://oxford-academy.es/wp-content/uploads/2019/02/45180255_1146456375536058_8123112895790710784_n.jpg",
    },
   
  ];

  const filas = [];
  let fila = [];

  // Creamos las filas de elementos según la estructura que necesitas
  for (let i = 0; i < imagenes.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      filas.push(fila);
      fila = [];
    }
    fila.push(imagenes[i]);
  }
  filas.push(fila);

  return (
    <div className="container py-5">
      <br /><br />
      {filas.map((fila, index) => (
        <Row key={index}>
          {fila.map((imagen) => (
            <Col xs={12} md={4} key={imagen.nombre}>
              <Card className="mb-3">
                <Card.Img variant="top" src={imagen.url} />
                <Card.Body>
                  <Card.Title>{imagen.nombre}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};
// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";

// export const ArbolDeFotos = () => {
//   return (
//     <div className="container py-5">
//       <Row>
//         <Col md={3}>
//           <Card>
//             <Card.Img variant="top" src="https://via.placeholder.com/150" />
//             <Card.Body>
//               <Card.Title>Imagen 1</Card.Title>
//             </Card.Body>
//           </Card>
//           <div className="mt-3">
//             <Row>
//               <Col md={3}>
//                 <Card>
//                   <Card.Img variant="top" src="https://via.placeholder.com/50" />
//                   <Card.Body>
//                     <Card.Title>Imagen 2</Card.Title>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={3}>
//                 <Card>
//                   <Card.Img variant="top" src="https://via.placeholder.com/50" />
//                   <Card.Body>
//                     <Card.Title>Imagen 3</Card.Title>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={3}>
//                 <Card>
//                   <Card.Img variant="top" src="https://via.placeholder.com/50" />
//                   <Card.Body>
//                     <Card.Title>Imagen 4</Card.Title>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//         <Col md={3}>
//           <Card>
//             <Card.Img variant="top" src="https://via.placeholder.com/150" />
//             <Card.Body>
//               <Card.Title>Imagen 5</Card.Title>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card>
//             <Card.Img variant="top" src="https://via.placeholder.com/150" />
//             <Card.Body>
//               <Card.Title>Imagen 6</Card.Title>
//             </Card.Body>
//           </Card>
//           <div className="mt-3">
//             <Row>
//               <Col md={3}>
//                 <Card>
//                   <Card.Img variant="top" src="https://via.placeholder.com/50" />
//                   <Card.Body>
//                     <Card.Title>Imagen 7</Card.Title>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={3}>
//                 <Card>
//                   <Card.Img variant="top" src="https://via.placeholder.com/50" />
//                   <Card.Body>
//                     <Card.Title>Imagen 8</Card.Title>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//         <Col md={3}>
//           <Card>
//             <Card.Img variant="top" src="https://via.placeholder.com/150" />
//             <Card.Body>
//               <Card.Title>Imagen 9</Card.Title>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };