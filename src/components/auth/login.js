import React, { useContext, useState } from 'react';

import { LoginContext } from './context.js';

const If = props => {
  return !!props.condition ? props.children : null;
};

const Login = props => {
  const loginContext = useContext(LoginContext);
  const [formData, setFormData] = useState({});

  const _handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const _handleSubmit = e => {
    e.preventDefault();
    loginContext.login(formData);
  };

  return (
    <>
      <If condition={loginContext.loggedIn}>
        <h1>Welcome!</h1>
        <button onClick={loginContext.logout}>Log Out</button>
      </If>
      <If condition={!loginContext.loggedIn}>
        <form onSubmit={_handleSubmit}>
          <input
            type="text"
            placeholder="User Name"
            name="username"
            onChange={_handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={_handleChange}
          />
          <button>Log In</button>
        </form>
      </If>
    </>
  );
};

export default Login;
