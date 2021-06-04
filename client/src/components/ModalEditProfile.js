import { useContext, useState, useEffect } from "react"
import { Modal, Row, Col, Form, Image, Alert } from "react-bootstrap"

import { API } from "../config/api"

import { UserContext } from "../contexts/userContext"
const ModalEditProfile = () => {
  const [state, dispatch] = useContext(UserContext)
  const [preview, setPreview] = useState()
  const [message, setMessage] = useState(undefined)
  const initialState = {
    fullName: undefined,
    email: undefined,
    phone: undefined,
    imageFile: undefined,
  }

  const [form, setForm] = useState(initialState)

  const handlePressed = () => {
    dispatch({ type: "ISPRESSED" })
  }
  const handleEditProfileTutup = () => {
    dispatch({ type: "EDITPROFILETUTUP" })
  }

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    })
  }

  const updateTodo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      const formData = new FormData()

      if (form.fullName) {
        formData.set("fullName", form.fullName)
      }
      if (form.phone) {
        formData.set("phone", form.phone)
      }
      if (form.imageFile) {
        formData.append("imageFile", form.imageFile, form.imageFile.name)
      }

      const response = await API.patch("/update", formData, config)
      setMessage(response.data.message)
      if (!response.data.message) {
        handlePressed()
        handleEditProfileTutup()
        setForm(initialState)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!form.imageFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(form.imageFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [form.imageFile])

  return (
    <Modal
      size='sm'
      centered
      show={state.isVisibleEditProfile}
      onHide={() => {
        handleEditProfileTutup()
        setForm(initialState)
        setMessage(undefined)
      }}>
      {[state.editProfileModal].map((approvedData, index) => {
        return (
          <div key={index}>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault()
                  updateTodo(e)
                }}>
                <Row className='justify-content-center'>
                  {form.imageFile ? (
                    <Image
                      style={{ width: "225px", height: "225px" }}
                      src={preview}
                    />
                  ) : (
                    <Image
                      style={{ width: "225px", height: "225px" }}
                      src={approvedData.avatar}
                    />
                  )}
                </Row>
                <Row className='d-flex justify-content-center mb-4'>
                  <Col md='auto'>
                    <label className='d-flex justify-content-center mt-2 custom-file-upload btn'>
                      <input
                        onChange={(e) => onChange(e)}
                        name='imageFile'
                        type='file'
                      />
                      <div>Change Picture</div>
                    </label>
                  </Col>
                </Row>

                <Form.Group as={Row} controlId='formPlaintextEmail'>
                  <Form.Label className='pinktext'>Email :</Form.Label>
                  <Form.Control
                    disabled
                    className='formmodal mb-3 form-control-default'
                    name='email'
                    onChange={(e) => onChange(e)}
                    defaultValue={approvedData.email}
                  />

                  <Form.Label className='pinktext'>Full Name :</Form.Label>
                  <Form.Control
                    className='formmodal mb-3 form-control-default'
                    name='fullName'
                    onChange={(e) => onChange(e)}
                    defaultValue={approvedData.fullName}
                  />

                  <Form.Label className='pinktext'>Phone :</Form.Label>
                  <Form.Control
                    className='formmodal mb-5 form-control-default'
                    name='phone'
                    onChange={(e) => onChange(e)}
                    defaultValue={approvedData.phone}
                  />
                </Form.Group>
                {message && (
                  <Alert className='text-center' variant={"danger"}>
                    {message}
                  </Alert>
                )}
                <Row>
                  <button
                    block
                    type='submit'
                    className='w-100 btn btn-modal mt-1'>
                    Edit
                  </button>
                </Row>
              </Form>
            </Modal.Body>
          </div>
        )
      })}
    </Modal>
  )
}

export default ModalEditProfile
