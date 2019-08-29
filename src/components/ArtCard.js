import React from 'react'
import { Card, Image, Button, Icon, ButtonGroup, Label } from 'semantic-ui-react'
import Moment from 'react-moment'
import 'moment-timezone'
import { connect } from 'react-redux'
import { artForDetail, showDetail } from '../actions/user'
import { userFetchArt } from '../actions/art'
import ArtCommentForm from './Comments'

class ArtCard extends React.Component {
  state = {
    showDetail: false
  }
  handleImageClick = (e, image) => {
    this.props.artForDetail(image) && this.props.showDetail()
  }

  saveToFavorites = (e, image) => {
    e.preventDefault();
    fetch("https://art-share-rails.herokuapp.com/favorites", {
      method: 'POST', body: JSON.stringify({
        user_id: localStorage.getItem('user_id'),
        photo_id: image.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(console.log)
  }

  likeImage = (e, image) => {
    fetch(`https://art-share-rails.herokuapp.com/photos/${image.id}`, {
      method: 'PATCH', body: JSON.stringify({
        likes: image.likes + 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((e) => this.props.fetchArt(e))
  }

  showDetails = (image) => (
    <Card.Content>
      <Card.Description>
        <p>
          {image.description}
        </p>
        <ul>
          <li>{image.medium}</li>
          <li>{image['surface_material']}</li>
          <li>{image.width} X {image.heigth}</li>
        </ul>
      </Card.Description>
      <Card.Meta>Art Pinned {<Moment date={new Date} />}
      </Card.Meta>
      <ArtCommentForm imageId={image.id} />
    </Card.Content>
  )

  render() {
    const sortedById = this.props.images.sort(function (a, b) {
      return a.id - b.id
    })
    console.log(sortedById)
    
    return (
      sortedById.map(image =>
        <Card
          color='orange'
          key={image.id}>
          <Card.Header>
            {image.title}
          </Card.Header>
          <Image
            fluid
            key={image.id}
            src={image.img}
            onClick={(e) => this.handleImageClick(e, image)} />
          <ButtonGroup fluid width={3}>
            <Button basic color='red' compact onClick={(e) => this.likeImage(e, image)}>
              <Icon name='heart' />
              {image.likes}
            </Button>
            {/* <Button.Or /> */}
            <Button
              basic color='green'
              onClick={(e) => this.saveToFavorites(e, image)}>
              Save
            </Button>
            {/* <Button.Or /> */}
            <Button
              basic
              color='blue'
              onClick={(e) => { this.setState({ showDetail: !this.state.showDetail }) }}>
              Details
            </Button>
          </ButtonGroup>
          {this.state.showDetail ? this.showDetails(image) : null}
        </Card>
      )
    )
  }
}
const mapStateToProps = (state) => {
  return { user: state.user, selectedArt: state.selectedArt, displayDetails: state.showDetail }
}
export default connect(mapStateToProps, { artForDetail, showDetail, userFetchArt })(ArtCard)
