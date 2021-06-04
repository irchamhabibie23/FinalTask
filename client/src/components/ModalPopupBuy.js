import { useContext } from "react"
import { Modal } from "react-bootstrap"

import { UserContext } from "../contexts/userContext"

const ModalPopupBuy = () => {
  const [state, dispatch] = useContext(UserContext)

  const handlePopupBuyTutup = () => {
    dispatch({
      type: "POPUPBUYTUTUP",
    })
  }

  return (
    <Modal
      centered
      size='lg'
      show={state.isVisiblePopupBuy}
      onHide={handlePopupBuyTutup}>
      <div className='popupbuy d-flex justify-content-center  text-center px-4 py-4'>
        <p className='popupbuy-margin'>
          please buy this film if you want to watch
        </p>
      </div>
    </Modal>
  )
}

export default ModalPopupBuy
