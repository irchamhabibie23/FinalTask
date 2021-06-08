import { useContext } from "react"
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import { UserContext } from "../contexts/userContext"

import DropdownProfile from "./DropdownProfile"
import DropdownProfileAdmin from "./DropdownProfileAdmin"
import ModalLogin from "./ModalLogin"
import ModalRegister from "./ModalRegister"
import ModalEditProfile from "./ModalEditProfile"
import ModalDonate from "./ModalDonate"
import ModalTransaction from "./ModalTransaction"
import ModalPopupPayment from "./ModalPopupPayment"
import ModalPopupBuy from "./ModalPopupBuy"

const NavbarComponent = () => {
  const [state, dispatch] = useContext(UserContext)

  const handleLoginModalBuka = () => {
    dispatch({
      type: "LOGINMODALBUKA",
    })
  }

  const handleRegisterModalBuka = () => {
    dispatch({
      type: "REGISTERMODALBUKA",
    })
  }

  return (
    <>
      <Container className='navbar-container margin-nav' expand='lg'>
        <Nav className='d-flex justify-content-between'>
          <Navbar.Brand as={Link} to='/'>
            <Image src='/Icon.svg' alt='icon-cinemaonline' className='icon' />
          </Navbar.Brand>
          {!state.isLogin ? (
            <div className='body-nav'>
              <Button className='btn-login' onClick={handleLoginModalBuka}>
                Login
              </Button>
              <button
                className='btn btn-regis'
                onClick={handleRegisterModalBuka}>
                Register
              </button>
            </div>
          ) : state.user.email === "admin@admin.com" ? (
            <DropdownProfileAdmin />
          ) : (
            <DropdownProfile />
          )}
        </Nav>
      </Container>

      <ModalLogin />
      <ModalRegister />
      <ModalPopupPayment />
      <ModalPopupBuy />
      <ModalEditProfile />

      <ModalTransaction />
      <ModalDonate />
    </>
  )
}

export default NavbarComponent
