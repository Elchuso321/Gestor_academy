import React from 'react';
import { FaWhatsapp, FaFacebookSquare, FaTiktok, FaInstagram, FaTwitter, FaTelegram } from 'react-icons/fa';

export const Footer = () => {
  const style = {
    backgroundColor: '#f5f5f5',
    color: '#333'
  };

  return (
    <div className="container-fluid" style={style}>
      <div className="container py-5">
        <footer className="text-center" style={style}>
          <div className="container">
           

            {/* <section className="mb-5">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                    distinctio earum repellat quaerat voluptatibus placeat nam,
                    commodi optio pariatur est quia magnam eum harum corrupti
                    dicta, aliquam sequi voluptate quas.
                  </p>
                </div>
              </div>
            </section> */}

            <section className="text-center mb-5">
              <a href="https://wa.me/1234567890" className="text-dark mx-3">
                <FaWhatsapp size={50} />
              </a>
              <a href="https://www.facebook.com/ejemplo" className="text-dark mx-3">
                <FaFacebookSquare size={50} />
              </a>
              <a href="https://www.tiktok.com/@ejemplo" className="text-dark mx-3">
                <FaTiktok size={50} />
              </a>
              <a href="https://www.instagram.com/ejemplo" className="text-dark mx-3">
                <FaInstagram size={50} />
              </a>
              <a href="https://twitter.com/ejemplo" className="text-dark mx-3">
                <FaTwitter size={50} />
              </a>
              <a href="https://t.me/ejemplo" className="text-dark mx-3">
                <FaTelegram size={50} />
              </a>
            </section>

            <section className="">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Dirección</h5>
                      <p className="card-text">Calle Falsa 123, Ciudad, País</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Horario de atención</h5>
                      <p className="card-text">Lunes a Viernes: 8:00am - 5:00pm</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 ">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Teléfono</h5>
                      <p className="card-text">123-456-7890</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Correo electrónico</h5>
                      <p className="card-text">info@ejemplo.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            

            {/* <div className="text-center text-md-start">
              <p>
                © {new Date().getFullYear()}  Todos los derechos reservados.
              </p>
            </div> */}
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Footer;
// import React from 'react';
// import { FaWhatsapp, FaFacebookSquare, FaTiktok } from 'react-icons/fa';

// export const Footer = () => {
//   const style = {
//     backgroundColor: '#f5f5f5',
//     color: '#333'
//   };

//   return (
//     <div className="container-fluid" style={style}>
//       <div className="container py-5">
//         <footer className="text-center" style={style}>
//           <div className="container">
//             <hr className="my-5" />

//             <section className="mb-1">
//               <div className="row d-flex justify-content-center">
//                 <div className="">
//                   <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
//                     distinctio earum repellat quaerat voluptatibus placeat nam,
//                     commodi optio pariatur est quia magnam eum harum corrupti
//                     dicta, aliquam sequi voluptate quas.
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <section className="text-center mb-5">
//               <a href="https://wa.me/1234567890" className="text-dark mx-3">
//                 <FaWhatsapp size={50} />
//               </a>
//               <a href="https://www.facebook.com/ejemplo" className="text-dark mx-3">
//                 <FaFacebookSquare size={50} />
//               </a>
//               <a href="https://www.tiktok.com/@ejemplo" className="text-dark mx-3">
//                 <FaTiktok size={50} />
//               </a>
//             </section>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };



// import React from 'react';
// import { FaWhatsapp,FaFacebookSquare,FaTiktok } from 'react-icons/fa';

// export const Footer=()=>{
//   const style = {
//     backgroundColor: '#3f51b5',
//     color: 'white'
//   }

//   return (
//     <div className="container my-5">
//       <footer className="text-center text-white" style={style}>
//         <div className="container">
//           <hr className="my-5" />

//           <section className="mb-5">
//             <div className="row d-flex justify-content-center">
//               <div className="col-lg-8">
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
//                   distinctio earum repellat quaerat voluptatibus placeat nam,
//                   commodi optio pariatur est quia magnam eum harum corrupti
//                   dicta, aliquam sequi voluptate quas.
//                 </p>
//               </div>
//             </div>
//           </section>

//           <section className="text-center mb-5">
            
//         <a href="https://wa.me/1234567890">
//             <FaWhatsapp size={50} color="green" />
//         </a>
//         <a href="https://wa.me/1234567890">
//             <FaFacebookSquare size={50} color="green" />
//         </a>
//         <a href="https://wa.me/1234567890">
//             <FaTiktok size={50} color="green" />
//         </a>

//           </section>
//         </div>
//       </footer>
//     </div>
//   );
// }
