import { useContext, useState, useEffect } from "react"
import { NavDropdown, Col, Row, Image, DropdownButton } from "react-bootstrap"
import { Link } from "react-router-dom"

import { API } from "../config/api"
import { UserContext } from "../contexts/userContext"

const DropdownProfileAdmin = () => {
  const [navbar, setNavbar] = useState([])
  const [state] = useContext(UserContext)

  const loadRaiseFund = async () => {
    try {
      const response = await API.get(`/profile`)
      setNavbar(response.data.data.profile[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      loadRaiseFund()
    }, 500)
  }, [state.editIsPressed])
  // let { data: navbar } = useQuery("navbar", async () => {
  //   const response = await API.get("/profile");
  //   return response.data.data.profile[0];
  // });

  const [, dispatch] = useContext(UserContext)

  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    })
  }
  return (
    <DropdownButton
      menuAlign='right'
      className='bg-trans'
      title={
        <div className='navbar-img-container'>
          <Image className='navbar-img' src={navbar?.avatar} />
        </div>
      }
      id='basic-nav-dropdown'>
      <div class='container'>
        <div class='row triangle-container'>
          <div class='col triangle-container'></div>
          <div class='col-2 triangle '></div>
        </div>
      </div>
      <div className='dropdown-item-container-admin py-4'>
        <NavDropdown.Item as={Link} to='/addfilm'>
          <Row className='px-4'>
            <Col className='px-0'>
              <Image src='/Group 4.svg' />
            </Col>
            <Col className='px-3'>Add Film</Col>
          </Row>
        </NavDropdown.Item>
        <hr className='solid'></hr>

        <NavDropdown.Item onClick={() => handleLogOut()} as={Link} to='/'>
          <Row className='px-4'>
            <Col className='px-0' style={{ maxWidth: "40px" }}>
              <Image src='/logout 1.svg' />
            </Col>
            <Col className='px-3'>Log Out</Col>
          </Row>
        </NavDropdown.Item>
      </div>
    </DropdownButton>
  )
}

export default DropdownProfileAdmin
