import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Alert from './component/layout/Alert';
import Search from './component/users/Search';
import Users from './component/users/Users';
import User from './component/users/User';
import About from './component/pages/About';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    loading: false,
    users: [],
    repos: [],
    user: {},
    alert: null
  };
  async componentDidMount() {
    // axios.get('https://api.github.com/users').then(res => {
    //   console.log(res.data);
    // });
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, users: res.data });
  }
  searchUserHandler = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, users: res.data.items });
  };
  // Get Users
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, user: res.data });
  };

  // Get User repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, repos: res.data });
  };

  // clear loaded users
  clearUsersHandler = () => {
    this.setState({ laoding: false, users: [] });
  };
  // set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 4000);
  };
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                path='/'
                exact
                render={props => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUserHandler}
                      onClickClearUsers={this.clearUsersHandler}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    repos={this.state.repos}
                    user={this.state.user}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
