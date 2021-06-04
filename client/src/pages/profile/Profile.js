import { useState, useEffect, useContext } from "react"
import { Row, Col, Container, Figure, Card } from "react-bootstrap"
import { API } from "../../config/api"
import { UserContext } from "../../contexts/userContext"
import { convertToRupiah } from "../../utils"
import LoadingPage from "../loading/LoadingPage"

const Profile = () => {
  const [profile, setProfile] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [state, dispatch] = useContext(UserContext)

  const handleEditProfileBuka = (item) => {
    dispatch({
      type: "EDITPROFILEBUKA",
      payload: item,
    })
  }

  const loadProfile = async () => {
    try {
      const response = await API.get(`/profile`)
      setProfile(response.data.data.profile[0])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      loadProfile()
    }, 500)
  }, [state.editIsPressed])

  useEffect(() => {
    setTimeout(() => {
      loadProfile()
    }, 500)
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container className='profile-container'>
          <Row id='page-body'>
            <Col id='profile-column'>
              <Row id='myprofile-title'>
                <Col>My Profile</Col>
              </Row>
              <Row id='myprofile-body'>
                <Col md='auto' className='profile-image-container'>
                  <Figure.Image
                    className='profile-image'
                    src={profile?.avatar}
                  />
                </Col>
                <Col>
                  <Row className='mb-4'>
                    <Card.Title className='pinktext mb-0'>Full Name</Card.Title>
                    <Card.Text className='mt-1 text-muted'>
                      {profile?.fullName}
                    </Card.Text>
                  </Row>
                  <Row className='mb-4'>
                    <Card.Title className='pinktext mb-0'>Email</Card.Title>
                    <Card.Text className='mt-1 text-muted'>
                      {profile?.email}
                    </Card.Text>
                  </Row>
                  <Row>
                    <Card.Title className='pinktext mb-0'>Phone</Card.Title>
                    <Card.Text className='mt-1 text-muted'>
                      {profile?.phone}
                    </Card.Text>
                  </Row>
                </Col>
              </Row>
              <Row id='myporfile-buton'>
                <Col>
                  <button
                    onClick={() => handleEditProfileBuka(profile)}
                    className='btn mt-4'>
                    Edit Profile
                  </button>
                </Col>
              </Row>
            </Col>

            <Col xs lg={5} id='history-transaction-column'>
              <Row id='history-transaction-title'>
                <Col className='myprofile'>History Transaction</Col>
              </Row>
              <Row id='history-transcation-body'>
                {profile?.purchasedFilms?.map((asd, index) => (
                  <div key={index} className='flex-row'>
                    <Card className='history-transaction'>
                      <Card.Body className='history-transaction-body'>
                        <Card.Title id='transaction-title'>
                          {asd.film}
                        </Card.Title>
                        <Card.Text id='transaction-date' className='mb-3 white'>
                          {asd.orderedAt}
                        </Card.Text>
                        <Row className='mb-2'>
                          <Col id='transaction-price' className='pinktext'>
                            Total : {convertToRupiah(asd.price)}
                          </Col>

                          <Col
                            id='transaction-status'
                            xs={6}
                            md={3}
                            className={
                              "status-container " +
                              (asd.status === "Finished"
                                ? "status-finished"
                                : asd.status === "Cancel"
                                ? "status-cancel"
                                : "status-pending")
                            }>
                            {asd.status}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default Profile
