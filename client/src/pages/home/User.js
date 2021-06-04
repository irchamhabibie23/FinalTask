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
        <Carousel className='d-flex'>
          {films?.map((item) => {
            return (
              <Carousel.Item key={item.id}>
                <Row className='d-flex justify-content-center'>
                  <Col className='d-flex justify-content-center' xs lg={4}>
                    <Card.Img
                      src={item.thumbnail}
                      style={{ height: "23rem", width: "16.7rem" }}
                    />
                  </Col>
                  <Col xs lg={5}>
                    <div
                      style={{
                        height: "23rem",
                        marginRight: "12%",
                        overflow: "hidden",
                      }}>
                      <h3 className='filmtitle'>{item.title}</h3>
                      <Row className='justify-content-between mb-1'>
                        <Col>
                          <h5 className='pinktext'>
                            {convertToRupiah(item.price)}
                          </h5>
                        </Col>
                        <Col xs lg={4}>
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

                      <p className='textimage'>{item.description}</p>
                    </div>
                  </Col>
                </Row>
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
