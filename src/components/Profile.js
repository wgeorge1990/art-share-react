import React from 'react';
import { Container, Image,  Grid, Button, Card } from 'semantic-ui-react';
import { connect } from 'react-redux'
import UploadProfileImage from './UploadProfileImage';
import ArtistsArtBoard from './ArtistsArtBoard';
import { Redirect } from 'react-router-dom';

class Profile extends React.Component {
    state ={
        gridSize: false, 
        toggle: false,
        initialLoad: false,
    }

    uploadedProfileImage = () => {
        this.setState({
            initialLoad: true
        })
    }

    edit = (e) => {
        this.setState({
            gridSize: !this.state.gridSize,
            toggle: !this.state.toggle
        })
    }
    render() {
        const profileImage = this.props.art.filter(art => (art.category === 'profile'))
        const filteredUser = profileImage.filter(art => art['user_id'] === parseInt(localStorage.getItem('user_id')))
    
        return (
            this.props.user ?
                        <Container style={{"width": "300px"}}>
                        <Card fluid >
                    <Image src={filteredUser[0].img}></Image>
                            <Card.Content style={{"textAlign": "center"}}>
                                <h1> Meet The Artist</h1>
                                <h2> {localStorage.firstname} {" " + localStorage.lastname}</h2>
                                <h3>  I was born and raised in Atlanta. Studied drawing at MICA, where I also learned to work with metal. I now am a software engineer as well as a graphic designer.</h3>
                            </Card.Content>
                    </Card>
                </Container>
              : null
        )
    }
}

const mapStateToProps = (state) => {
    return { art: state.art, user: state.user }
}

export default connect(mapStateToProps)(Profile)