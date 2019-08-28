import React from 'react';
import { Container, Segment, Form, Button, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadUserFile } from '../actions/user';
import { userFetchArt } from '../actions/art';

const url = 'https://art-share-rails.herokuapp.com/photos';

class UploadProfileImage extends React.Component {
    state = {
        image: null,
        category: null,
        user_id: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('category', "profile");
        formData.append('user_id', localStorage.getItem('user_id'))

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
                this.fetchArtistsPhotos(e)
            )
        this.props.uploaded(e)
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
    render() {
        return (
            <Container>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Input
                        label='File'
                        name='file'
                        type="file"
                        onChange={(e) => this.fileHandler(e)} />
                    <Button
                        type="reset" >Reset</Button>
                    <Button type="submit">Pin Image</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return { uploadedImage: state.uploadedFile }
}

export default connect(mapStateToProps, { uploadUserFile, userFetchArt })(UploadProfileImage);
