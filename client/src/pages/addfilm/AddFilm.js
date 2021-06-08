import { useState, useEffect } from "react"
import { Container, Col, Row, Form, Image } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { API } from "../../config/api"

const AddFilm = () => {
  const [thumbnail, setThumbnail] = useState()
  const [backdrop, setBackdrop] = useState()
  const router = useHistory()

  const initialState = {
    title: "",
    imageFile1: "",
    imageFile2: "",
    CategoryId: null,
    price: null,
    filmUrl: "",
    description: "",
  }

  const [form, setFormData] = useState(initialState)

  const clearState = () => {
    setFormData({ ...initialState })
  }

  useEffect(() => {
    if (!form.imageFile1) {
      setThumbnail(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(form.imageFile1)
    setThumbnail(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [form.imageFile1])

  useEffect(() => {
    if (!form.imageFile2) {
      setBackdrop(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(form.imageFile2)
    setBackdrop(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [form.imageFile2])

  const onChange = (e) => {
    setFormData({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
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
      formData.set("title", form.title)
      formData.append("imageFile1", form.imageFile1, form.imageFile1.name)
      formData.append("imageFile2", form.imageFile2, form.imageFile2.name)
      formData.set("CategoryId", form.CategoryId)
      formData.set("price", form.price)
      formData.set("filmUrl", form.filmUrl)
      formData.set("description", form.description)

      await API.post(`/film`, formData, config)
    } catch (error) {
      console.log(error)
    } finally {
      clearState()
      router.push("/")
    }
  }

  return (
    <Container style={{ maxWidth: "70rem" }}>
      <Row className='white'>
        <Col className='mb-5'>
          <h2>Add Film</h2>
        </Col>
      </Row>

      <Form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(e)
        }}>
        <Row>
          <Col>
            <Form.Control
              required
              className='formmodal mb-4 form-control-default'
              onChange={(e) => onChange(e)}
              name='title'
              type='text'
              placeholder='Title'
            />
          </Col>
        </Row>

        <Row className='mb-4'>
          <Col>
            <Row>
              <Col xs={4.5}>
                <label className='form-control formmodal form-control-placeholder d-flex justify-content-between'>
                  <input
                    required
                    onChange={(e) => onChange(e)}
                    name='imageFile1'
                    type='file'
                  />
                  Attach Thumbnail
                  <Image style={{ height: "24px" }} src='/Frame 1.svg' />
                </label>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={4.5}>
                <label className='form-control formmodal form-control-placeholder d-flex justify-content-between'>
                  <input
                    required
                    onChange={(e) => onChange(e)}
                    name='imageFile2'
                    type='file'
                  />
                  Attach Backdrop
                  <Image style={{ height: "24px" }} src='/Frame 1.svg' />
                </label>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            {form.imageFile1 && (
              <Image
                className='mb-4'
                style={{ maxWidth: "300px", height: "230px" }}
                src={thumbnail}
              />
            )}
          </Col>
          <Col lg={6}>
            {form.imageFile2 && (
              <Image
                className='mb-4'
                style={{ maxWidth: "300px", height: "230px" }}
                src={backdrop}
              />
            )}
          </Col>
        </Row>

        <Form.Group controlId='exampleForm.ControlSelect1'>
          <Form.Control
            required
            className={"formmodal mb-4 form-control-placeholder"}
            onChange={(e) => onChange(e)}
            name='CategoryId'
            as='select'
            defaultValue={""}>
            <option value={""} disabled>
              Select Film Category
            </option>
            <option value={1}>Family</option>
            <option value={2}>Sci-Fi</option>
            <option value={3}>Horor</option>
            <option value={4}>Comedy</option>
            <option value={5}>Drama</option>
          </Form.Control>
        </Form.Group>

        <Form.Control
          required
          className='formmodal mb-4 form-control-default'
          onChange={(e) => onChange(e)}
          name='price'
          type='number'
          placeholder='Price'
        />

        <Form.Control
          required
          className='formmodal form-control-default'
          onChange={(e) => onChange(e)}
          name='filmUrl'
          type='text'
          placeholder='Link Film'
        />
        <Form.Control
          required
          className='mt-4 formmodal form-control-text'
          onChange={(e) => onChange(e)}
          name='description'
          placeholder='Description'
          as='textarea'></Form.Control>
        <Row>
          <Col xs={9}></Col>
          <Col className='mt-5'>
            <button className='w-100 btn-addfilm btn' type='submit'>
              Add Film
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default AddFilm
