import { useHistory } from "react-router-dom"
import { useContext } from "react"
import { Card } from "react-bootstrap"

import { UserContext } from "../contexts/userContext"

const CardDonate = ({ filmList }) => {
  const [state, dispatch] = useContext(UserContext)
  const { id, thumbnail } = filmList

  const router = useHistory()

  const handleLoginModalBuka = () => {
    dispatch({
      type: "LOGINMODALBUKA",
    })
  }

  const goToDetailPage = () => {
    router.push(`/detailfilm/${id}`)
  }

  return (
    <Card className='mb-5 card-film-container'>
      {!state.isLogin ? (
        <Card.Img
          className='card-film-image'
          onClick={handleLoginModalBuka}
          src={thumbnail}
          alt='img'
        />
      ) : (
        <Card.Img
          className='card-film-image'
          onClick={goToDetailPage}
          src={thumbnail}
          alt='img'
        />
      )}
    </Card>
  )
}

export default CardDonate
