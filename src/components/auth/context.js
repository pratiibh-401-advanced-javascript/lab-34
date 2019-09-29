import React from 'react';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

const API = process.env.REACT_APP_API;

export const LoginContext = React.createContext();

class LoginContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      login: this.login,
      logout: this.logout,
    };
  }

  login = user => {
    const auth = `Basic ${btoa(`${user.username}:${user.password}`)}`;
    console.log({API,user});
    
    fetch(`${API}/signin`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        Authorization: `${auth}`,
      }),
    })
      .then(response => response.text())
      .then(token => this.validateToken(token))
      .catch(console.error);
  };

  validateToken = token => {
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      if (user.id) {
        cookie.save('auth', token);
        this.setState({ loggedIn: true, capabilities: user.capabilities });
      }
    } catch (e) {
      console.error(e);
    }
  };

  logout = () => {
    cookie.save('auth', null);
    this.setState({ loggedIn: false });
  };

  componentDidMount() {
    let token = cookie.load('auth');
    this.validateToken(token);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginContextProvider;
