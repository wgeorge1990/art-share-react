import React, { Component } from 'react';
import './App.css';
import { Container, Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';
import './semantic/dist/semantic.min.css';

import ImageUploads from './components/ImageUploads';
import ArtistsArtBoard from './components/ArtistsArtBoard';
import Home from './components/routes/Home';
import Login from './components/Login'
import Menu from './components/Menu'
import HeaderImage from './components/HeaderImage';
import Profile from './components/Profile'
import { connect } from 'react-redux'
import { userFetchArt } from './actions/art';
import { currentUser, clearCurrentUser, leaveDetail } from './actions/user';
import BrowseAllArt from './components/BrowseAllArt';
import CreateAccountForm from './components/CreateAccountForm';
import ArtDetail from './components/ArtDetail';
import Favorites from './components/Favorites';
import SignUp from './components/routes/SignUpRoute';

class App extends Component {
  fetchArtistsPhotos = (e) => {
    const photosAPI = "https://art-share-rails.herokuapp.com/photos"
    return (
      fetch(photosAPI)
        .then(res => res.json())
        .then(data => this.props.userFetchArt(data)))
  }

  componentDidMount = () => {
    this.fetchArtistsPhotos()
  }

  setUser = (user) => {
    this.props.currentUser(user)
  }

  logOut = (e) => {
    this.props.clearCurrentUser();
    localStorage.clear();
    this.props.leaveDetail();

  }

  render() {
    return (
      <Router>
        <Container fluid>
          {this.props.user ? <Menu user={this.props.user} logOut={this.logOut} /> : null}
          <Switch>
            <Route exact path="/ArtistsArtBoard" render={() => <ArtistsArtBoard fetchArt={this.fetchArtistsPhotos} />} />
            <Route exact path="/BrowseAllArt" render={() => <BrowseAllArt fetchArt={this.fetchArtistsPhotos} />} />
            <Route exact path="/SignUp" render={() => <CreateAccountForm setUser={this.setUser} />} />
            <Route exact path="/Login" render={() => <Login user={this.props.user} setUser={this.setUser} />} />
            <Route exact path="/ImageUploads" component={ImageUploads} />
            <Route exact path="/ArtDetail" render={() => <ArtDetail />} />
            <Route exact path="/Favorites" render={() => <Favorites />} />
            <Route exact path="/" render={() => <Home fetchArt={this.fetchArtistsPhotos} />} />
          </Switch>
        </Container>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return { art: state.art, user: state.user }
}

export default connect(mapStateToProps, { userFetchArt, currentUser, clearCurrentUser, leaveDetail })(App)