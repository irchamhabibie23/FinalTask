import { useState, useEffect } from "react"

import { Row, Col, Container } from "react-bootstrap"

import { API } from "../../config/api"
import CardDonate from "../../components/CardDonate"
import LoadingPage from "../loading/LoadingPage"

const MyFilm = () => {
  const [myfilms, setMyFilms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const loadMyFilm = async () => {
    try {
      const response = await API.get(`/my-films`)
      setMyFilms(response.data.data.myFilms)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadMyFilm()
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container className='navbar-container'>
          <Row
            style={{
              marginTop: "50px",
              marginLeft: "85px",
              marginBottom: "50px",
            }}>
            <Col>
              <h2 style={{ color: "white" }}>My List Film</h2>
            </Col>
          </Row>
          <Row>
            {myfilms?.map((myfilm, index) => {
              if (myfilm.status === "Finished") {
                return (
                  <Col
                    key={index}
                    md='auto'
                    className='mx-3 mb-5'
                    style={{ maxWidth: "330px" }}>
                    <CardDonate filmList={myfilm} />
                  </Col>
                )
              } else {
                return <></>
              }
            })}
          </Row>
        </Container>
      )}
    </>
  )
}

export default MyFilm
