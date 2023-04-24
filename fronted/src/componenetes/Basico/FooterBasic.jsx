import React from 'react';
// import { FontAwesomeIcon } from 'react-fontawesome';
// import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FaWhatsapp,FaFacebookSquare,FaTiktok } from 'react-icons/fa';

export const Footer=()=>{
  const style = {
    backgroundColor: '#3f51b5',
    color: 'white'
  }

  return (
    <div className="container my-5">
      <footer className="text-center text-white" style={style}>
        <div className="container">
          <hr className="my-5" />

          <section className="mb-5">
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
          </section>

          <section className="text-center mb-5">
            
        <a href="https://wa.me/1234567890">
            <FaWhatsapp size={50} color="green" />
        </a>
        <a href="https://wa.me/1234567890">
            <FaFacebookSquare size={50} color="green" />
        </a>
        <a href="https://wa.me/1234567890">
            <FaTiktok size={50} color="green" />
        </a>


        



         
            {/* <a href="" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a className="text-white me-4" href="#">
            <i className="fab fa-facebook-f"></i>
            
            </a>
            <a className="text-white me-4" href="#">
            perro
            </a>
            <a className="text-white me-4" href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a> */}
            {/* 
            <a className="text-white me-4" href="#">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a className="text-white me-4" href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="text-white me-4" href="#">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a className="text-white me-4" href="#">
              <FontAwesomeIcon icon={faGithub} />
            </a> */}
          </section>
        </div>
      </footer>
    </div>
  );
}
