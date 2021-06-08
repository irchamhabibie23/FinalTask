import { useContext, useState, useEffect } from "react"
import { NavDropdown, Col, Row, Image, DropdownButton } from "react-bootstrap"
import { Link } from "react-router-dom"

import { API } from "../config/api"
import { UserContext } from "../contexts/userContext"

const DropdownProfile = () => {
  const [navbar, setNavbar] = useState([])
  const [state, dispatch] = useContext(UserContext)

  const loadProfile = async () => {
    try {
      const response = await API.get(`/profile`)
      setNavbar(response.data.data.profile[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      loadProfile()
    }, 500)
  }, [state.editIsPressed])
  // let { data: navbar } = useQuery("navbar", async () => {
  //   const response = await API.get("/profile");
  //   return response.data.data.profile[0];
  // });

  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    })
  }
  return (
    <DropdownButton
      menuAlign='right'
      title={
        <div className='navbar-img-container'>
          <Image className='navbar-img' src={navbar?.avatar} />
        </div>
      }
      id='basic-nav-dropdown'>
      <div className='container'>
        <div className='row triangle-container'>
          <div className='col triangle-container'></div>
          <div className='col-2 triangle '></div>
        </div>
      </div>
      <div className='dropdown-item-container-user py-4'>
        <NavDropdown.Item className='mb-4' as={Link} to='/profile'>
          <Row className='px-3'>
            <Col md='auto'>
              <Image src='/user 2.svg' />
            </Col>
            <Col className='px-2'>Profile</Col>
          </Row>
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to='/my-film'>
          <Row className='px-3'>
            <Col md='auto'>
              <Image src='/Group 4.svg' />
            </Col>
            <Col className='px-2 '>My List Film</Col>
          </Row>
        </NavDropdown.Item>
        <hr className='solid'></hr>
        <div className='bg-trans'>
          <NavDropdown.Item onClick={() => handleLogOut()} as={Link} to='/'>
            <Row className='px-3'>
              <Col md='auto'>
                <Image src='/logout 1.svg' />
              </Col>
              <Col className='px-2'>Log Out</Col>
            </Row>
          </NavDropdown.Item>
        </div>
      </div>
    </DropdownButton>
  )
}

export default DropdownProfile
