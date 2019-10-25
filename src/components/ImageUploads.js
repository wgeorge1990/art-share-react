import React from 'react';
import { Container, Segment, Form, Button, Input, Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadUserFile } from '../actions/user';
import { userFetchArt } from '../actions/art';

const url = 'https://art-share-rails.herokuapp.com/photos';

class ImageUploads extends React.Component {
  state = {
    image: null,
    title: null,
    description: null,
    medium: null,
    sold: true,
    height: null,
    width: null,
    category: null,
    surface_material: null
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.image);
    formData.append('title', this.state.title);
    formData.append('user_id', localStorage.getItem('user_id'))
    formData.append('likes', 0)
    formData.append('description', this.state.description)
    formData.append('medium', this.state.medium)
    formData.append('sold', this.state.sold)
    formData.append('heigth', this.state.height)
    formData.append('width', this.state.width)
    formData.append('category', this.state.category)
    formData.append('surface_material', this.state['surface_material'])

    const options = {
      method: 'POST',
      headers: {
        'Access-Token': localStorage.getItem('token')
      },
      body: formData
    }
    fetch(url, options)
      .then(res => res.json())
      .then(json =>
        this.props.uploadUserFile(json.img) &&
        this.fetchArtistsPhotos() && setTimeout(() => this.props.history.push('/'), 3000)
      )
  };

  fetchArtistsPhotos = () => {
    const photosAPI = "https://art-share-rails.herokuapp.com/photos"
    return (
      fetch(photosAPI)
        .then(res => res.json())
        .then(data => this.props.userFetchArt(data)))
  }

  fileHandler = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  titleHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  sizeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value + "  inches"
    })
  }

  render() {
    return (
      <Container>
        <Grid columns={this.state.gridSize ? 3 : 2}>
          <Grid.Column>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Input
                label='File'
                name='file'
                type="file"
                onChange={(e) => this.fileHandler(e)} />
              <Form.Input
                label="Title"
                type="text"
                placeholder="Title"
                name='title'
                onChange={(e) => this.titleHandler(e)} />
              <Form.Input
                label="Description"
                type="text"
                placeholder="Description"
                name='description'
                onChange={(e) => this.titleHandler(e)} />
              <Form.Input
                label="Medium"
                type="text"
                placeholder="Medium or Materials used"
                name='medium'
                onChange={(e) => this.titleHandler(e)} />
              <Form.Input
                label="Surface Material"
                type="text"
                placeholder="Surface material"
                name='surface_material'
                onChange={(e) => this.titleHandler(e)} />
              <Form.Input
                label="Deminsion: Width"
                type="text"
                placeholder="width in inches"
                name='width'
                onChange={(e) => this.sizeHandler(e)} />
              <Form.Input
                label="Deminsion: Height"
                type="text"
                placeholder="height"
                name='height'
                onChange={(e) => this.sizeHandler(e)} />
              <Form.Input
                label="Sold: true or false"
                type="text"
                placeholder="sold"
                name='sold'
                onChange={(e) => this.titleHandler(e)} />
              <Form.Input
                label="Category or Genre"
                type="text"
                placeholder="category"
                name='category'
                onChange={(e) => this.titleHandler(e)} />
              <Button
                type="reset" >Reset</Button>
              <Button type="submit">Pin Image</Button>
            </Form>
          </Grid.Column>
          <Grid.Column>
            {this.props.uploadedImage ? <img style={{ height: "800px" }} alt="Present Upload" src={this.props.uploadedImage} />
              : null}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { uploadedImage: state.uploadedFile }
}

export default connect(mapStateToProps, { uploadUserFile, userFetchArt })(ImageUploads);