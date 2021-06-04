import { useContext } from "react"
import { Modal } from "react-bootstrap"

import { UserContext } from "../contexts/userContext"

const ModalPopupPayment = () => {
  const [state, dispatch] = useContext(UserContext)

  const handlePopupPaymentTutup = () => {
    dispatch({
      type: "POPUPPAYMENTTUTUP",
    })
  }

  return (
    <Modal
      centered
      size='lg'
      show={state.isVisiblePopupPayment}
      onHide={handlePopupPaymentTutup}>
      <p className='popuppayment d-flex text-center px-4 py-4'>
        thank you for buying this film, please wait 1x24 hours because your
        transaction is in process
      </p>
    </Modal>
  )
}

export default ModalPopupPayment
