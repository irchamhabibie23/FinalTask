import { Col, Container, Row } from "react-bootstrap";
const Film = () => {
  return (
    <Container>
      <Container fluid className='mt-5 hero-image'>
        <div style={{ marginLeft: "6%" }}>
          <Row>
            <Col
              style={{
                fontSize: "365%",
                color: "white",
                maxWidth: "14%",
                lineHeight: "97%",
              }}>
              DEAD POOL
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col className='textimage'>Action</Col>
          </Row>
          <Row className='mt-1'>
            <Col className='textimage'>Rp. 99,000</Col>
          </Row>
          <Row className='textimagecontainer mt-5'>
            <Col className='textimage'>
              Hold onto your chimichangas, folks. From the studio that brought
              you all 3 Taken films comes the block-busting,
              fourth-wall-breaking masterpiece about Marvel Comics’ sexiest
              anti-hero! Starring God’s perfect idiot Ryan Reynolds and a bunch
              of other "actors," DEADPOOL is a giddy slice of awesomeness packed
              with more twists than Deadpool’s enemies’ intestines and more
              action than prom night. Amazeballs!
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default Film;
