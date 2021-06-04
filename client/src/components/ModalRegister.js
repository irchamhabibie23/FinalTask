import { useContext, useState } from "react"
import { Modal, Form, Alert } from "react-bootstrap"

import { UserContext } from "../contexts/userContext"
import { API, setAuthToken } from "../config/api"

const ModalRegister = () => {
  const [state, dispatch] = useContext(UserContext)
  const [message, setMessage] = useState("")
  const initialState = {
    email: "",
    password: "",
    fullName: "",
  }
  const [form, setForm] = useState(initialState)
  const { email, password, fullName } = form

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const body = JSON.stringify({
        email,
        password,
        fullName,
      })

      const response = await API.post("/register", body, config)
      setMessage(response.data.message)

      if (message.length === 0) {
        setForm(initialState)
      }
      setAuthToken(response.data.data.user.token)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleRegisterModalTutup = () => {
    dispatch({
      type: "REGISTERMODALTUTUP",
    })
  }
  const handleLoginModalBuka = () => {
    dispatch({
      type: "LOGINMODALBUKA",
    })
  }

  return (
    <Modal
      size='sm'
      centered
      show={state.isVisibleRegister}
      onHide={() => {
        handleRegisterModalTutup()
        setMessage("")
        setForm(initialState)
      }}>
      <Modal.Body>
        <Modal.Title className='pinktext modal-titles'>Register</Modal.Title>
        <div className='body'>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(e)
            }}>
            {message && (
              <Alert className='text-center' variant={"danger"}>
                {message}
              </Alert>
            )}
            <Form.Control
              className='formmodal mb-4 form-control-default'
              onChange={(e) => onChange(e)}
              name='email'
              type='email'
              value={email}
              placeholder='Email'
              required
            />
            <Form.Control
              className='formmodal mb-4 form-control-default'
              onChange={(e) => onChange(e)}
              name='password'
              type='password'
              value={password}
              placeholder='Password'
              required
            />
            <Form.Control
              className='formmodal mb-5 form-control-default'
              onChange={(e) => onChange(e)}
              name='fullName'
              type='text'
              value={fullName}
              placeholder='Full Name'
              required
            />
            <button block className='w-100 btn btn-modal' type='submit'>
              Register
            </button>
            <div
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => {
                handleLoginModalBuka()
                handleRegisterModalTutup()
              }}
              className='mt-3 d-flex justify-content-center'>
              Already have an account ? Click Here
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalRegister
