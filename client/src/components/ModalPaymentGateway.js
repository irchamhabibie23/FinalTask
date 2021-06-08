import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Modal, Image, Row, Col } from "react-bootstrap"

import { UserContext } from "../contexts/userContext"
import { API } from "../config/api"
const ModalPaymentGateway = (items) => {
  const [state, dispatch] = useContext(UserContext)
  const [statusPayment, setStatusPayment] = useState("")
  const films = items.films
  const { id } = films
  const router = useHistory()
  const handlePaymentGatewayTutup = () => {
    dispatch({
      type: "PAYMENTGATEWAYTUTUP",
    })
  }

  const handlePopupPaymentBuka = () => {
    dispatch({
      type: "POPUPPAYMENTBUKA",
    })
  }

  const handleDonateModalBuka = () => {
    dispatch({
      type: "DONATEMODALBUKA",
      payload: films,
    })
  }

  const deleteTransaction = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      await API.delete(`/transaction/${id}`, config)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (statusPayment === "Closed") {
      deleteTransaction()
      setStatusPayment("")
    } else if (statusPayment === "success") {
      handlePopupPaymentBuka()
      router.push("/")
    }
  }, [statusPayment])

  const onClickBuy = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const body = JSON.stringify({ FilmId: id })
      const addTransaction = await API.post("/transaction", body, config)

      const setOrderToken = JSON.stringify({
        id: addTransaction.data.data.id,
        price: films.price,
        customer: state.user,
      })

      const transactionToken = await API.post(
        "/order-product",
        setOrderToken,
        config
      )

      const token = transactionToken.data.data.token

      window.snap.pay(token, {
        onSuccess: function (result) {
          setStatusPayment("success")
          console.log(result)
        },
        onPending: function (result) {
          console.log("pending")
          console.log(result)
        },
        onError: function (result) {
          console.log("error")
          console.log(result)
        },
        onClose: function () {
          setStatusPayment("Closed")
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      centered
      size='lg'
      show={state.isVisiblePaymentGateway}
      onHide={handlePaymentGatewayTutup}>
      <Modal.Body>
        <h4 className='white'>Choose Payment Gateway:</h4>
        <Row className='d-flex justify-content-around my-5'>
          <Col lg={3}>
            <Image
              style={{ width: "100%", cursor: "pointer" }}
              src='/Icon.svg'
              alt='icon-cinemaonline'
              onClick={() => {
                handleDonateModalBuka()
                handlePaymentGatewayTutup()
              }}
            />
          </Col>
          <Col lg={3}>
            <Image
              className='my-2'
              style={{ width: "100%", cursor: "pointer" }}
              src='/midtrans.png'
              alt='icon-midtrans'
              onClick={() => {
                onClickBuy()
                handlePaymentGatewayTutup()
              }}
            />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default ModalPaymentGateway
