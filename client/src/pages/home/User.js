import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Row, Col, Container, Carousel, Form } from "react-bootstrap"
import { API } from "../../config/api"
import CardDonate from "../../components/CardDonate"
import { convertToRupiah } from "../../utils"
import { UserContext } from "../../contexts/userContext"

const User = () => {
  const [state, dispatch] = useContext(UserContext)
  const [searchTerms, setSearchTerms] = useState("")
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

  const onChange = (e) => {
    setSearchTerms(e.target.value)
  }

  return (
    <Container className='mt-5' style={{ minHeight: "935px" }}>
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
        <Col style={{ color: "white", fontSize: "230%" }} className='mt-5 mb-2'>
          List Film
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control
            onChange={(e) => onChange(e)}
            className='formmodal form-control-default'
            placeholder='Search...'
          />
        </Col>
      </Row>
      <Row className='mb-4 mt-5'>
        {films
          ?.filter((item) => {
            if (searchTerms === "") {
              return item
            } else if (
              item.title.toLowerCase().includes(searchTerms.toLowerCase())
            ) {
              return item
            } else {
              return ""
            }
          })
          .map((item) => {
            return (
              <Col xs lg={2} key={item.id}>
                <CardDonate filmList={item} />
              </Col>
            )
          })}
      </Row>
    </Container>
  )
}

export default User
