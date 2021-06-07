import { useState, useEffect, useContext } from "react"
import {
  Table,
  Row,
  Col,
  NavDropdown,
  Container,
  DropdownButton,
  Image,
} from "react-bootstrap"
import { UserContext } from "../../contexts/userContext"
import { API } from "../../config/api"

function Admin() {
  const [, dispatch] = useContext(UserContext)
  const [profile, setProfile] = useState([])
  const [approve] = useState("Finished")
  const [cancel] = useState("Cancel")
  const [, setIsLoading] = useState(true)

  const loadProfile = async () => {
    try {
      const response = await API.get(`/transaction`)
      setProfile(response.data.data.transaction)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const postCancel = async (item) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const body = JSON.stringify({
        status: cancel,
      })

      await API.patch(`updateTransactionStatus/${item}`, body, config)
    } catch (error) {
      console.log(error)
    } finally {
      loadProfile()
    }
  }

  const postApproved = async (item) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const body = JSON.stringify({
        status: approve,
      })

      await API.patch(`updateTransactionStatus/${item}`, body, config)
    } catch (error) {
      console.log(error)
    } finally {
      loadProfile()
    }
  }
  const handleModalTransaction = (item) => {
    dispatch({
      type: "TRANSACTIONMODALBUKA",
      payload: item,
    })
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      loadProfile()
    }, 500)
  }, [])
  return (
    <Container style={{ maxWidth: "74rem" }}>
      <h1 className='white mb-5'>Incoming Transaction</h1>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr style={{ color: "red" }}>
            <th className='px-3'>No</th>
            <th>Users</th>
            <th>Bukti Transfer</th>
            <th>Film</th>
            <th>Number Account</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {profile?.map((item, index) => {
            return (
              <tr className='py-4' key={index}>
                <td className='px-3'>{item.id}</td>
                <td>{item.User.fullName}</td>
                <td>
                  <href
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleModalTransaction(item.transferProof)
                    }}>
                    {item.transferProof}
                  </href>
                </td>
                <td>{item.Film.title}</td>
                <td>{item.accountNumber}</td>
                <td
                  className={
                    item.status === "Finished"
                      ? "finished"
                      : item.status === "Pending"
                      ? "pending"
                      : "cancel"
                  }>
                  {item.status}
                </td>
                <td>
                  <DropdownButton
                    menuAlign='right'
                    title={
                      <div>
                        <Image src='/Polygon 2.png' />
                      </div>
                    }>
                    <div className='container'>
                      <div className='row triangle-container'>
                        <div className='col triangle-container'></div>
                        <div className='col-2 triangle-small '></div>
                      </div>
                    </div>
                    <div className='dropdown-item-container py-2'>
                      <NavDropdown.Item
                        onClick={() => {
                          postApproved(item.id)
                        }}>
                        <Row>
                          <Col
                            className='d-flex justify-content-center finished'
                            xs
                            style={{
                              fontSize: "1rem",
                            }}>
                            Approved
                          </Col>
                        </Row>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => postCancel(item.id)}>
                        <Row>
                          <Col
                            className='d-flex justify-content-center cancel'
                            style={{
                              fontSize: "1rem",
                            }}>
                            Cancel
                          </Col>
                        </Row>
                      </NavDropdown.Item>
                    </div>
                  </DropdownButton>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default Admin
