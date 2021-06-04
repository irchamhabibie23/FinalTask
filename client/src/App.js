import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

import { UserContext } from "./contexts/userContext";
import { API, setAuthToken } from "./config/api";

import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

import Home from "./pages/home/Home.js";
import AddFilm from "./pages/addfilm/AddFilm.js";
import Profile from "./pages/profile/Profile";
import MyFilm from "./pages/myfilm/MyFilm";
import DetailFilm from "./pages/detailfilm/DetailFilm";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const [, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <PrivateRoute exact path='/addfilm' component={AddFilm} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/detailfilm/:id' component={DetailFilm} />
          <PrivateRoute exact path='/my-film' component={MyFilm} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
