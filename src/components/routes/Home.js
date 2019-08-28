import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import ArtistsArtBoard from '../ArtistsArtBoard'
import { connect } from 'react-redux'

const Home = (props) => (
  <div className="Home">
    {props.user ? null : <Redirect to='/Login'/>}
    <ArtistsArtBoard fetchArt={props.fetchArt}/>
  </div>
)
const mapStateToProps = (state) => {
  return { user: state.user }
}
export default connect(mapStateToProps)(Home)