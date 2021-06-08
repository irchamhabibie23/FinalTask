import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Row, Col, Container, Modal } from "react-bootstrap"
import { Player, BigPlayButton } from "video-react"
import "../../../node_modules/video-react/dist/video-react.css"
import { API } from "../../config/api"
import LoadingPage from "../loading/LoadingPage"
import ModalPaymentGateway from "../../components/ModalPaymentGateway"
import { convertToRupiah } from "../../utils"
import { UserContext } from "../../contexts/userContext"

const DetailFilm = () => {
  const [state, dispatch] = useContext(UserContext)
  const [films, setFilms] = useState([])
  const [modal, setModal] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const { id } = params

  const handlePopUpBuy = () => {
    dispatch({
      type: "POPUPBUYBUKA",
    })
  }

  const handlePopupPaymentBuka = () => {
    dispatch({
      type: "POPUPPAYMENTBUKA",
    })
  }

  const handlePaymentGatewayBuka = () => {
    dispatch({
      type: "PAYMENTGATEWAYBUKA",
    })
  }

  const loadFilm = async () => {
    try {
      const response = await API.get(`/film/${id}`)
      setFilms(response.data.data.book[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadFilm()
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    const midTransScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const midTransClientKey = "SB-Mid-client-Cbqkqdo_7MGn2PNt"

    const scriptTag = document.createElement("script")
    scriptTag.src = midTransScript
    scriptTag.setAttribute("data-client-key", midTransClientKey)
    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  const isAvail = state.myFilmLists.filter((asd) => asd.film === films.title)
  const status = isAvail.map((list) => list.status)
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container className='navbar-container mt-5'>
          <ModalPaymentGateway films={films} />
          <Row>
            <Col style={{ flex: "0 0 auto", width: "30%" }}>
              <Card.Img src={films?.thumbnail} alt='Card image' />
            </Col>
            <Col style={{ marginLeft: "2rem" }}>
              <Row className='mb-5'>
                <Col>
                  <Card.Title className='white'>
                    <h1>{films?.title}</h1>
                  </Card.Title>
                </Col>
                <Col className='align-self-center text-right'>
                  {status[status.length - 1] === "Pending" ||
                  status[status.length - 1] === "Finished" ? (
                    <button className='btn'>{status[status.length - 1]}</button>
                  ) : (
                    <button
                      className='btn'
                      onClick={() => {
                        // handleDonateModalBuka()
                        // onClickBuy()
                        handlePaymentGatewayBuka()
                      }}>
                      Buy Now
                    </button>
                  )}
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col
                  onClick={() => {
                    switch (isAvail[0]?.status) {
                      case "Pending":
                        return handlePopupPaymentBuka()
                      case "Cancel":
                      case undefined:
                        return handlePopUpBuy()
                      default:
                        return
                    }
                  }}>
                  <Player
                    className={
                      isAvail[0]?.status === "Finished"
                        ? "video-react-approved"
                        : "video-react-notapproved"
                    }
                    src={films?.filmUrl}>
                    <BigPlayButton position='center' />
                  </Player>
                </Col>
              </Row>
              <Row>
                <p className='category-title'>{films?.Category?.name}</p>
                <p className='pinktext price-tag'>
                  {films?.price && convertToRupiah(films.price)}
                </p>
                <p className='white description'>{films?.description}</p>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default DetailFilm
