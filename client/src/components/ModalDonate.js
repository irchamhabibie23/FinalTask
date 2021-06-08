import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Modal, Form, Row, Col, Image } from "react-bootstrap"
import { API } from "../config/api"

import { UserContext } from "../contexts/userContext"
import { convertToRupiah } from "../utils"

const ModalDonate = (data) => {
  const [state, dispatch] = useContext(UserContext)
  const [preview, setPreview] = useState()

  const router = useHistory()

  const initialState = {
    accountNumber: "",
    imageFile: "",
  }

  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (!form.imageFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(form.imageFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [form.imageFile])

  const clearState = () => {
    setForm({ ...initialState })
  }

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    })
  }

  const handleDonateModalTutup = () => {
    dispatch({
      type: "DONATEMODALTUTUP",
    })
  }

  const handlePopupPaymentBuka = () => {
    dispatch({
      type: "POPUPPAYMENTBUKA",
    })
  }

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      const formData = new FormData()
      formData.set("accountNumber", form.accountNumber)
      formData.append("imageFile", form.imageFile, form.imageFile.name)

      await API.post(`purchase/${state.modalBuy.id}`, formData, config)
      handleDonateModalTutup()
      setPreview(undefined)
      setForm(initialState)
    } catch (error) {
      console.log(error)
    } finally {
      router.push(`/`)
    }
  }

  return (
    <Modal
      centered
      show={state.isVisibleDonate}
      onHide={() => {
        handleDonateModalTutup()
        clearState()
        setPreview(undefined)
      }}>
      <Modal.Body>
        <Modal.Title className='white d-flex justify-content-center'>
          <p className='font-weight-bold '>
            Cinema<span className='pinktext'>Online</span> : 0981312323
          </p>
        </Modal.Title>
        <Modal.Title className='white mt-3'>
          {state.modalBuy?.title}
        </Modal.Title>
        <Row>
          <Col className='pinktext font-weight-bold'>
            <p>
              <span className='white'>Total : {""}</span>
              {state.modalBuy?.price && convertToRupiah(state.modalBuy.price)}
            </p>
          </Col>
        </Row>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
            handlePopupPaymentBuka()
          }}>
          <Form.Control
            required
            className='formmodal form-control-default'
            onChange={(e) => onChange(e)}
            name='accountNumber'
            value={form.accountNumber}
            type='number'
            placeholder='Input Your Account Number'
          />
          <Row>
            <Col className='mt-3' xs={12}>
              <label className='custom-file-upload btn'>
                <input
                  onChange={(e) => onChange(e)}
                  name='imageFile'
                  type='file'
                />
                <div>
                  Attach Payment {""}
                  <Image src='/Group 14.svg'></Image>
                </div>
              </label>
              <span className='grey py-2 ml-2'>
                *transfers can be made to holyways accounts
              </span>
            </Col>
          </Row>
          <Row>
            {form.imageFile && <Image className='w-100 mt-4' src={preview} />}
          </Row>
          <Row>
            <Col className='d-flex' xs lg={12}>
              <button
                className='mt-5 btn btn-modal'
                style={{ width: "100%" }}
                type='submit'
                block
                variant='primary'>
                Pay
              </button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalDonate
