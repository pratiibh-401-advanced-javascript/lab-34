import React, { useContext } from 'react';

import { LoginContext } from './context.js';

const If = props => {
  return !!props.condition ? props.children : null;
};

const Auth = props => {
  const loginContext = useContext(LoginContext);
  // if you are logged in
  // and
  // if we specified a capability in the props and you have it
  // .  you are good
  // If we didn't specficy a capability, true.

  // <Auth><span /></Auth>
  // <Auth capability="foo"><span/></Auth>

  // const okToRender =
  //   loginContext.loggedIn === true &&
  //   (props.capability
  //     ? loginContext.capabilities.includes(props.capability)
  //     : true);

  let okToRender = loginContext.loggedIn === true;
  if (okToRender) {
    if (props.capability) {
      if (loginContext.capabilities.includes(props.capability)) {
        okToRender = true;
      } else {
        okToRender = false;
      }
    } else {
      okToRender = true;
    }
  }

  return <If condition={okToRender}>{props.children}</If>;
};

export default Auth;
