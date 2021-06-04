import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { API } from "../config/api";
import CardDonate from "../components/CardDonate";

const Footer = () => {
  const [funds, setFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsError] = useState(false);

  const loadTodos = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await API.get(`/funds`);
      setFunds(response.data.data.funds);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <Container fluid>
        <Row className='d-flex justify-content-md-center  '>
          <Col className='text-center texts-footer'>Donate Now</Col>
        </Row>
        {isLoading === false ? (
          <Row
            className='d-flex justify-content-center mb-4'
            style={{ marginTop: "49px" }}>
            {funds?.map((asd) => {
              return (
                <Col className='mr-5' md='auto'>
                  <CardDonate donateList={asd} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <div className='d-flex justify-content-center mt-5 mb-5'>
            <Spinner animation='border' variant='danger' />
          </div>
        )}
      </Container>
    </>
  );
};

export default Footer;
