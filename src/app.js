import React from 'react';

import LoginContext from './components/auth/context.js';
import Login from './components/auth/login.js';
import Auth from './components/auth/auth.js';
import ToDo from './components/todo/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <LoginContext>
      <header>
        <Login />
      </header>
      <section>
        <Auth>
        <ToDo />
          <div>Welcome Home</div>
        </Auth>
        <Auth capability="delete">
          <button>Write an Article</button>
        </Auth>
      </section>
    </LoginContext>
    );
  }
}
