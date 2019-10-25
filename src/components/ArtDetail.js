import React from 'react';
import { Button, Container, Image, Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { leaveDetail } from '../actions/user'
import { Moment } from 'react-moment';
import ArtCommentForm from './Comments';

class ArtDetail extends React.Component {
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

    render() {
        return (
            <Container  textAlign='center'>
                <Button
                    centered
                    onClick={() => this.props.leaveDetail()}
                >Back to Art</Button>
                <Card centered fluid>
                    <h1>{this.props.art.title}</h1>
                    <Image
                        centered
                        style={{ 'width': '70%', 'height': '70%' }}
                        onClick={() => this.props.leaveDetail()}
                        src={this.props.art.img} />


                    <Button
                        basic color='green'
                        onClick={(e) => this.saveToFavorites(e, this.props.art)}>
                        Pin To Favorites
            </Button>
                    <Card.Description >
                        <h2>{this.props.art.description}</h2>
                        <h3>{this.props.art.medium}</h3>
                        <h3>{this.props.art['surface_material']}</h3>
                        <h3>{this.props.art.width} X {this.props.art.height}</h3>
                        <h3>{this.props.art.category}</h3>
                        <h3>{this.props.art.sold}</h3>

                    </Card.Description>

                </Card>
            </Container>
        )
    }
};

const mapStateToProps = (state) => {
    return { user: state.user, art: state.selectedArt }
}

export default connect(mapStateToProps, { leaveDetail })(ArtDetail)