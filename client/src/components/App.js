import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
import Login from "./Account/Login/Login";
import WrappedSignup from "./Account/Signup/WrappedSignup";
import Profile from "./Account/Profile/Profile";
import Forgot from "./Account/Forgot/Forgot";
import Reset from "./Account/Reset/Reset";
import WrappedFeedback from "./Feedback/WrappedFeedback";
import RequestFeedback from "./RequestFeedback/RequestFeedback";
import listIncomingFeedback from "./Feedback/ListIncomingFeedback";
import { Provider, subscribe } from "react-contextual";

const store = {
  initialState: { jwtToken: null, user: {}, messages: {} },
  actions: {
    saveSession: (jwtToken, user) => ({ jwtToken, user }),
    clearSession: () => ({ jwtToken: null, user: {} }),
    clearMessages: () => ({ messages: {} }),
    setErrorMessages: errors => ({ messages: { error: errors } }),
    setSuccessMessages: success => ({ messages: { success: success } })
  }
};

const isAuthenticated = props => props.jwtToken !== null;

const PrivateRoute = subscribe()(({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated(props) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
));

class App extends React.Component {
  render() {
    return (
      <Provider {...store}>
        <CookiesProvider>
          <BrowserRouter>
            <div>
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/feedback" component={WrappedFeedback} />
                <Route
                  path="/listIncomingFeedback"
                  component={listIncomingFeedback}
                />
                <Route path="/requestFeedback" component={RequestFeedback} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={WrappedSignup} />
                <PrivateRoute path="/account" component={Profile} />
                <Route path="/forgot" component={Forgot} />
                <Route path="/reset/:token" component={Reset} />
                <Route path="*" component={NotFound} />
              </Switch>
              <Footer />
            </div>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default App;
