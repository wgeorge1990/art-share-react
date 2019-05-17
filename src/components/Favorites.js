import React from 'react'
import { Card, Container, Image, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import ArtDetail from './ArtDetail';
import Moment from 'react-moment';
import { artForDetail, showDetail } from '../actions/user';
import _ from 'lodash'
import { Redirect } from 'react-router-dom';

class Favorites extends React.Component {
    state = {
        faves: []
    }

    handleImageClick = (e, image) => {
        console.log("inside show detail on click")
        this.props.artForDetail(image[0]) && this.props.showDetail()
    }

    fetchUsersFavorites = () => {
        fetch("http://localhost:3000/favorites", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => this.setState({
                faves: data
            }))

    }

    componentDidMount() {
        this.fetchUsersFavorites()
    }
    
    render() {
        let userFaves = this.state.faves.filter(fave => fave['user_id'] === parseInt(localStorage['user_id']))
       let photoIds = _.uniq(userFaves.map(fave => fave['photo_id']))
       let filteredArt =  photoIds.map(id => 
            this.props.art.filter(art => art.id === id))

        console.log( photoIds, filteredArt)
        return (
            this.props.user ? 
            <Container fluid>
                {this.props.displayDetails === true ? <ArtDetail />  :
                    <Container fluid >
                        <Card.Group itemsPerRow={3}>
                            {filteredArt.map(image =>
                            <Card 
                            key={image.id}>
                            <Image 
                            key={image.id}
                            src={image[0].img}
                            onClick={(e) => this.handleImageClick(e, image)} />
                            <Card.Content>
                                <Card.Header>{image[0].title}</Card.Header>
                                <Card.Description>
                                <p>{image[0].description}</p>
                                <li >{image[0].medium}</li>
                                <li >{image[0]['surface_material']}</li>
                                <li >{image[0].width}45' X 78'{image[0].height}</li>
                                </Card.Description>
                                <Card.Meta>Art Pinned {<Moment date={new Date} />}</Card.Meta>
                            </Card.Content>
                            </Card> )}
                         </Card.Group>
                    </Container>}
            </Container>
                            : <Redirect to="/login" /> 
                
        )
    }
}

const mapStateToProps = (state) => {
    return { art: state.art, displayDetails: state.showDetail, user: state.user}
}

export default connect(mapStateToProps, { artForDetail, showDetail })(Favorites)