import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Row, Col, Container, Carousel, Card } from "react-bootstrap"
import { API } from "../../config/api"
import CardDonate from "../../components/CardDonate"
import { convertToRupiah } from "../../utils"
import { UserContext } from "../../contexts/userContext"

const User = () => {
  const [state, dispatch] = useContext(UserContext)
  const [films, setFilm] = useState([])
  // const [isLoading, setIsLoading] = useState(true);
  const router = useHistory()
  const loadFilm = async () => {
    try {
      const response = await API.get(`/film`)
      setFilm(response.data.data.films)

      // setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadFilm()
  }, [])

  const handleLoginModalBuka = () => {
    dispatch({
      type: "LOGINMODALBUKA",
    })
  }

  const goToDetailPage = (id) => {
    router.push(`/detailfilm/${id}`)
  }

  return (
    <Container className='mt-5'>
      <Container>
        <Carousel fade>
          {films?.map((item) => {
            return (
              <Carousel.Item interval={3000}>
                <Container style={{ width: "1105px" }}>
                  <img
                    style={{ height: "437px", width: "1081px", opacity: "0.6" }}
                    className='d-block'
                    src={item.backdrop}
                    alt='First slide'
                  />
                  <Carousel.Caption>
                    <Row className='filmtitle-container'>
                      <Col md='auto' className='filmtitle'>
                        {item.title}
                      </Col>
                    </Row>
                    <Row className='filmcategory-container mb-2'>
                      <Col className='carousel-caption-body' md='auto'>
                        {item.category}
                      </Col>
                    </Row>
                    <Row className='filmcategory-container mb-3'>
                      <Col className='pinktext carousel-caption-body' md='auto'>
                        {convertToRupiah(item.price)}
                      </Col>
                    </Row>
                    <Row className='filmcategory-container mb-3'>
                      <Col
                        className='carousel-caption-body-description carousel-caption-body-description-container'
                        md='auto'>
                        {item.description}
                      </Col>
                    </Row>
                    <Row className='filmcategory-container'>
                      <Col md='auto'>
                        {!state.isLogin ? (
                          <button
                            onClick={() => {
                              handleLoginModalBuka()
                            }}
                            className='btn btn-regis'>
                            Buy Now
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              goToDetailPage(item.id)
                            }}
                            className='btn btn-regis'>
                            Buy Now
                          </button>
                        )}
                      </Col>
                    </Row>
                  </Carousel.Caption>
                </Container>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </Container>

      <Row>
        <Col style={{ color: "white", fontSize: "230%" }} className='mt-5'>
          List Film
        </Col>
      </Row>
      <Row
        className='d-flex justify-content-center mb-4'
        style={{ marginTop: "49px" }}>
        {films?.map((item) => {
          return (
            <Col className='d-flex justify-content-center' key={item.id}>
              <CardDonate filmList={item} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default User
