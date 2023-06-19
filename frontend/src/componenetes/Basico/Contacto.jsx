import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Ultimo/AuthContext';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarBasic from './NavbarBasic';
import Footer from './FooterBasic';

export const Contacto = () => {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);

  return (


    <>
      <div style={{ backgroundColor: '#f8f9fa' }}>
        <NavbarBasic />
        <br /><br /><br /><br /><br /><br /><br /><br />
        <div className="my-5">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={6} lg={4}>
                <div className="text-center">
                  <img
                    src="https://oxford-academy.es/wp-content/uploads/2018/03/mayores-8-informatica.jpg"
                    alt="altText"
                    className="img-fluid rounded-circle shadow"
                    style={{ backgroundColor: '#fff', maxWidth: '300px' }}
                  />
                </div>
              </Col>
              <Col md={6} lg={8}>
                <div className="text-center">
                  <h3 className="mb-4 text-primary">Curso de inglés intensivo</h3>
                  <p>
                    Tus hijos están de vacaciones y no tienen que ir a clase, por lo que disponen de más tiempo libre. Apúntalos a cualquiera de nuestros cursos de inglés y verás cómo mejoran su nivel de manera práctica y divertida.
                  </p>
                  <p>
                    ¿Necesitas tu B1 o B2 y quieres aprovechar el verano para prepararlo? Únete a nuestros intensivos de verano o trae a tres alumnos más y crearemos un curso a medida y conveniencia. También disponemos de clases individuales en las que tú marcas el ritmo.
                  </p>
                  <p>
                    Consulta los precios en las secretarías de nuestras academias en El Algar o La Unión, o llama al teléfono <span className="font-weight-bold">619 007 229</span>.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <hr />

        <div className="my-5">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={6} lg={8}>
                <div className="text-center">
                  <h3 className="mb-4 text-primary">Refuerzo de asignaturas y recuperaciones de septiembre para ESO y Bachiller</h3>
                  <p>
                    Refuerzo de asignaturas y recuperaciones de septiembre para ESO y Bachiller. Para recuperar las asignaturas que se hayan suspendido durante el curso escolar y ayudar a superar los exámenes de septiembre.
                    Inglés, francés, matemáticas, física, química, lengua, literatura, historia, biología, geología, geografía, historia, economía, latín, griego, tecnología y dibujo técnico.
                  </p>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="text-center">
                  <img
                    src="https://oxford-academy.es/wp-content/uploads/2018/03/APOYO-ESPECI%CC%81FICO-NGLE%CC%81S-.jpg"
                    alt="altText"
                    className="img-fluid rounded-circle shadow"
                    style={{ backgroundColor: '#fff', maxWidth: '300px' }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <br /><br />
        {/* style={{ background: 'linear-gradient(to right, #007bff, #fff)' }} */}
        <div className="my-5">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={6} lg={4}>
                <div className="text-center">
                  <img
                    src="https://oxford-academy.es/wp-content/uploads/2018/03/APOYO-ESPECI%CC%81FICO-NGLE%CC%81S-.jpg"
                    alt="altText"
                    className="img-fluid rounded-circle shadow"
                    style={{ backgroundColor: '#fff', maxWidth: '300px' }}
                  />
                </div>
              </Col>
              <Col md={6} lg={8}>
                <div className="text-center">
                  <h3 className="mb-4 text-primary">Tus hijos están de vacaciones</h3>
                  <p>
                    Selectividad. Preparación para los exámenes de Selectividad de septiembre. Si en el momento de la inscripción no dispusiéramos de grupo para la asignatura en la que estás interesado, te proporcionaríamos clases individuales, siempre con profesores especialistas en la materia.
                  </p>
                  <h3 className="mt-4 text-primary">Refuerzo escolar para Primaria</h3>
                  <p>
                    Nuestros cursos ayudan a tus hijos a reforzar los contenidos básicos de las asignaturas principales, aprenderán técnicas de estudio y tendrán ayuda para realizar las tareas escolares de verano. Atención personalizada en grupos muy reducidos. Informe de seguimiento al finalizar el curso.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Footer />
      </div>
    </>
  );
};
{/* 
// export default Contacto;


// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../Ultimo/AuthContext';
// import { Container, Row, Col } from 'react-bootstrap';
// import Footer from './FooterBasic';
// import { NavbarBasic } from './NavbarBasic';
// // import NavbarBasic from './NavbarBasic';
// // import { Footer } from './FooterBasic';
// // import Footer from './FooterBasic';

// export const Contacto = () => {
//   const navigate = useNavigate();
//   const { authTokens } = useContext(AuthContext);

//   return (
//     <>
//       <div style={{ backgroundColor: '#f8f9fa' }}>
//         <NavbarBasic />
//         <br /><br /><br /><br /><br /><br /><br /><br />
//         <div className="mt-5 my-5">
//           <Container>
//             <Row className="mt-5 justify-content-center align-items-center">
//               <Col md={6} lg={4}>
//                 <div className="text-center">
//                   <img
//                     src="https://oxford-academy.es/wp-content/uploads/2018/03/mayores-8-informatica.jpg"
//                     alt="altText"
//                     className="img-fluid rounded-circle"
//                     style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}
//                   />
//                 </div>
//               </Col>
//               <Col md={6} lg={8}>
//                 <div className="text-center">
//                   <h3 className="mb-4" style={{ color: '#007bff', fontFamily: 'Arial', fontWeight: 'bold' }}>
//                     Curso de inglés intensivo
//                   </h3>
//                   <p>
//                     Tus hijos están de vacaciones y no tienen que ir a clase, por lo que disponen de más tiempo libre. Apúntalos a cualquiera de nuestros cursos de inglés y verás cómo mejoran su nivel de manera práctica y divertida.
//                   </p>
//                   <p>
//                     ¿Necesitas tu B1 o B2 y quieres aprovechar el verano para prepararlo? Únete a nuestros intensivos de verano o trae a tres alumnos más y crearemos un curso a medida y conveniencia. También disponemos de clases individuales en las que tú marcas el ritmo.
//                   </p>
//                   <p>
//                     Consulta los precios en las secretarías de nuestras academias en El Algar o La Unión, o llama al teléfono <span style={{ color: '#007bff', fontWeight: 'bold' }}>619 007 229</span>.
//                   </p>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </div>

//         <hr />

//         <div className="my-5">
//           <Container>
//             <Row className="justify-content-center align-items-center">
//               <Col md={6} lg={8}>
//                 <div className="text-center">
//                   <h3 className="mb-4" style={{ color: '#007bff', fontFamily: 'Arial', fontWeight: 'bold' }}>
//                     Refuerzo de asignaturas y recuperaciones de septiembre para ESO y Bachiller
//                   </h3>
//                   <p>
//                     Refuerzo de asignaturas y recuperaciones de septiembre para ESO y Bachiller. Para recuperar las asignaturas que se hayan suspendido durante el curso escolar y ayudar a superar los exámenes de septiembre.
//                     Inglés, francés, matemáticas, física, química, lengua, literatura, historia, biología, geología, geografía, historia, economía, latín, griego, tecnología y dibujo técnico.
//                   </p>
//                 </div>
//               </Col>
//               <Col md={6} lg={4}>
//                 <div className="text-center">
//                   <img
//                     src="https://oxford-academy.es/wp-content/uploads/2018/03/APOYO-ESPECI%CC%81FICO-NGLE%CC%81S-.jpg"
//                     alt="altText"
//                     className="img-fluid rounded-circle"
//                     style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}
//                   />
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </div>

//         <div className="my-5" style={{ background: 'linear-gradient(to right, #007bff, #fff)' }}>
//           <Container>
//             <Row className="justify-content-center align-items-center">
//               <Col md={6} lg={4}>
//                 <div className="text-center">
//                   <img
//                     src="https://oxford-academy.es/wp-content/uploads/2018/03/APOYO-ESPECI%CC%81FICO-NGLE%CC%81S-.jpg"
//                     alt="altText"
//                     className="img-fluid rounded-circle"
//                     style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}
//                   />
//                 </div>
//               </Col>
//               <Col md={6} lg={8}>
//                 <div className="text-center">
//                   <h3 className="mb-4" style={{ color: '#007bff', fontFamily: 'Arial', fontWeight: 'bold' }}>
//                     Tus hijos están de vacaciones
//                   </h3>
//                   <p>
//                     Selectividad. Preparación para los exámenes de Selectividad de septiembre. Si en el momento de la inscripción no dispusiéramos de grupo para la asignatura en la que estás interesado, te proporcionaríamos clases individuales, siempre con profesores especialistas en la materia.
//                   </p>
//                   <h3 className="mt-4" style={{ color: '#007bff', fontFamily: 'Arial', fontWeight: 'bold' }}>
//                     Refuerzo escolar para Primaria
//                   </h3>
//                   <p>
//                     Nuestros cursos ayudan a tus hijos a reforzar los contenidos básicos de las asignaturas principales, aprenderán técnicas de estudio y tendrán ayuda para realizar las tareas escolares de verano. Atención personalizada en grupos muy reducidos. Informe de seguimiento al finalizar el curso.
//                   </p>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };


// // import ImageAndText from '../Generico/Image&Text'
// // import CarouselComponent from '../Generico/Carrousel'
// // import { Footer } from './FooterBasic'
// // import { NavbarBasic } from './NavbarBasic'
// // import jwt_decode from "jwt-decode";
// // import React, { useEffect, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom'
// // import AuthContext from '../Ultimo/AuthContext';

// // import { Container, Row, Col } from "react-bootstrap";



// // export const Contacto = () => {
// //     const navigate = useNavigate()
// //     let { authTokens } = useContext(AuthContext)

// //     return (
// //         <>
// //             <div style={{ backgroundColor: '' }}>
// //                 <NavbarBasic />
// //                 <br />
// //                 <br /><br /><br /><br /><br /><br />
// //                 <div className='mt-5'>
// //                     <div className="mt-5">
// //                         <h3 style={{ textAlign: 'center', color: '#007bff', fontFamily: 'Arial', background: '#f8f9fa', padding: '10px' }}>Curso de inglés intensivo</h3>
// //                         <Container>
// //                             <Row className="d-flex align-items-center">
// //                                 <Col sm={6} md={4} className="align-items-center">
// //                                     <img
// //                                         src="https://oxford-academy.es/wp-content/uploads/2018/03/mayores-8-informatica.jpg"
// //                                         alt="altText"
// //                                         className="img-fluid rounded-circle"
// //                                         style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
// //                                     />
// //                                 </Col>
// //                                 <Col sm={6} md={8}>
// //                                     <h3 style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>Refuerzo de asignaturas y recuperaciones
// // de septiembre para ESO y Bachiller</h3>
// //                                     <p>
// //                                         Tus hijos están de vacaciones y no tienen que ir a clase, por lo que disponen de más tiempo libre. Apúntalos a cualquiera de nuestros cursos de inglés y verás cómo mejoran su nivel de manera práctica y divertida.
// //                                     </p>
// //                                     <p>
// //                                         ¿Necesitas tu B1 o B2 y quieres aprovechar el verano para prepararlo? Únete a nuestros intensivos de verano o trae a tres alumnos más y crearemos un curso a medida y conveniencia. También disponemos de clases individuales en las que tú marcas el ritmo.
// //                                     </p>
// //                                     <p>
// //                                         Consulta los precios en las secretarías de nuestras academias en El Algar o La Unión, o llama al teléfono <span style={{ color: '#007bff', fontWeight: 'bold' }}>619 007 229</span>.
// //                                     </p>
// //                                 </Col>
// //                             </Row>
// //                         </Container>
// //                     </div>
                    
// //                     <hr />
// //                     <div className="mt-5">
// //                         <h3 style={{ textAlign: 'center', color: '#007bff', fontFamily: 'Arial', background: '#f8f9fa', padding: '10px' }}>Refuerzo de asignaturas y recuperaciones
// // de septiembre para ESO y Bachiller</h3>
// //                         <Container>
// //                             <Row className="d-flex align-items-center">
// //                                 <Col sm={6} md={4} className="align-items-center">
// //                                     <img
// //                                         src="https://oxford-academy.es/wp-content/uploads/2018/03/mayores-8-informatica.jpg"
// //                                         alt="altText"
// //                                         className="img-fluid rounded-circle"
// //                                         style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
// //                                     />
// //                                 </Col>
// //                                 <Col sm={6} md={8}>
// //                                     <h3 style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>Selectividad</h3>
// //                                     <p>
// //                                     Refuerzo de asignaturas y recuperaciones
// // de septiembre para ESO y Bachiller
// // Para recuperar las asignaturas que se hayan suspendido durante el curso escolar y ayudar a superar los exámenes de septiembre.

// // Inglés, francés, matemáticas, física, química, lengua, literatura, historia, biología, geología, geografía, historia, economía, latín, griego, tecnología y dibujo técnico.
// //                                     </p>
// //                                 </Col>
// //                             </Row>
// //                         </Container>
// //                         <br />
// //                         <Container>
// //                             <Row className="d-flex align-items-center">
// //                                 <Col sm={6} md={4} className="align-items-center">
// //                                     <img
// //                                         src="https://oxford-academy.es/wp-content/uploads/2018/03/APOYO-ESPECI%CC%81FICO-NGLE%CC%81S-.jpg"
// //                                         alt="altText"
// //                                         className="img-fluid rounded-circle"
// //                                         style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
// //                                     />
// //                                 </Col>
// //                                 <Col sm={6} md={8}>
// //                                     <h3 style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>Tus hijos están de vacaciones</h3>
// //                                     <p>
// //                                     Selectividad
// // Preparación para los exámenes de Selectividad de septiembre.

// // Si en el momento de la inscripción no dispusiéramos de grupo para la asignatura en la que estás interesado, te proporcionaríamos clases individuales, siempre con profesores especialistas en la materia.
// // <h3 style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}> Refuerzo escolar para Primaria:
// // </h3>
// // Nuestros cursos ayudan a tus hijos a reforzar los contenidos básicos de las asignaturas principales, aprenderán técnicas de estudio y tendrán ayuda para realizar las tareas escolares de verano. Atención personalizada en grupos muy reducidos. Informe de seguimiento al finalizar el curso.
// //                                     </p>
// //                                 </Col>
// //                             </Row>
// //                         </Container>
// //                     </div>

// //                 </div>
// //                 <Footer />
// //             </div>
// //         </>
// //     )
// // } */}
