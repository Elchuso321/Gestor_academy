import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ImageAndText=(props)=> {
  const { imageUrl, altText, heading, subheading } = props;

  return (
    <Container>
      <Row className="d-flex align-items-center">
        <Col sm={6} md={4} className="align-items-center">
          <img src={imageUrl} alt={altText} className="img-fluid" />
        </Col>
        <Col sm={6} md={8}>
          <h3>{heading}</h3>
          <p>{subheading}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ImageAndText;
