import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
    
const NoPermissionsError = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center">
            <h1 className="display-4">Error: Sin permisos</h1>
            <p className="lead">
              Lo siento, no tienes los permisos necesarios para acceder a esta página.
            </p>
            <p>
              Por favor, ponte en contacto con el administrador del sistema para obtener los permisos adecuados.
            </p>

          </div>
        </Col>
      </Row>
      <Button variant="danger">Salir</Button>
    </Container>
  );
};

export default NoPermissionsError;