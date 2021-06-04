import { useState, useEffect, useContext } from "react"

import LoadingPage from "../loading/LoadingPage"
import Admin from "./Admin"
import User from "./User"
import { API } from "../../config/api"
import { Container } from "react-bootstrap"
import { UserContext } from "../../contexts/userContext"
function Home() {
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  const loadMyFilms = async () => {
    try {
      const response = await API.get(`/my-films`)
      dispatch({
        type: "MYFILMS",
        payload: response.data.data.myFilms,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (state.isLogin === true) {
      loadMyFilms()
    }
  }, [state.isLogin])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container>
          {state.user?.email === "admin@admin.com" ? <Admin /> : <User />}
        </Container>
      )}
    </>
  )
}

export default Home
