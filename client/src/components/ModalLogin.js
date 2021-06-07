import { useContext, useState } from "react"
import { Modal, Form, Alert } from "react-bootstrap"
import { GoogleLogin } from "react-google-login"

import { UserContext } from "../contexts/userContext"

import { API, setAuthToken } from "../config/api"

const ModalLogin = () => {
  const [state, dispatch] = useContext(UserContext)
  const initialState = {
    email: "",
    password: "",
  }
  const [message, setMessage] = useState("")
  const [form, setForm] = useState(initialState)
  const { email, password } = form

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
      })

      const response = await API.post("/login", body, config)
      setMessage(response.data.message)

      setAuthToken(response.data.data.user.token)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      })

      setForm(initialState)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginModalTutup = () => {
    dispatch({
      type: "LOGINMODALTUTUP",
    })
  }

  const handleRegisterModalBuka = () => {
    dispatch({
      type: "REGISTERMODALBUKA",
    })
  }

  const onSuccessGoogle = async (res) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const body = JSON.stringify({
        email: res.profileObj.email,
        password: res.profileObj.googleId,
        fullName: res.profileObj.name,
        avatar: res.profileObj.imageUrl,
      })
      await API.post("/register", body, config)
      const response = await API.post("/login", body, config)
      setAuthToken(response.data.data.user.token)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onFailureGoogle = (res) => {
    console.log("Google Sign in was unsuccessful. Try Again Later")
  }

  return (
    <Modal
      className='modal-border'
      centered
      show={state.isVisibleLogin}
      onHide={() => {
        handleLoginModalTutup()
        setMessage("")
        setForm({
          email: "",
          password: "",
        })
      }}>
      <Modal.Body>
        <p className='pinktext modal-titles'>Login</p>

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
            className='formmodal mb-5 form-control-default'
            onChange={(e) => onChange(e)}
            name='password'
            type='password'
            value={password}
            placeholder='Password'
            required
          />
          <button block type='submit' className='w-100 btn btn-modal mb-4'>
            Login
          </button>
          <GoogleLogin
            className='w-100 d-flex justify-content-center'
            clientId='882775032737-7s3bj5kcr6qac4bq136ofhklv8mto9r3.apps.googleusercontent.com'
            onSuccess={onSuccessGoogle}
            onFailure={onFailureGoogle}
          />
        </Form>

        <div
          onClick={() => {
            handleLoginModalTutup()
            handleRegisterModalBuka()
          }}
          style={{ color: "white", cursor: "pointer" }}
          className='mt-3 d-flex justify-content-center'>
          Don't have an account? Click Here
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalLogin
