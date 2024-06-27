import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './waiting.css';
import Image from './images.png';
const CenteredCardWithImageAside = () => {
  return (
    <Container className="set">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className='w-100'>
            <Card.Body>
              <Row className="w-100">
              <div className="align-items-center d-flex flex-column">
                <Col xs={12} md={4}>
                  <img src={Image} alt="placeholder" className="img-fluid" />
                </Col>

                <Col xs={12} md={8} className='mt-5 fs-2 text-secondary text-center'>
                  
                    
                    <Card.Text >
                        It will take up to 3-4 buisness day for the approval of your profile
                    </Card.Text>
                </Col>
                </div>

              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CenteredCardWithImageAside;
