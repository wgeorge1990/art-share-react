import React from 'react';
import { Container, Image,  Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'
import UploadProfileImage from './UploadProfileImage';
import ArtistsArtBoard from './ArtistsArtBoard';
import { Redirect } from 'react-router-dom';

class Profile extends React.Component {
    state ={
        gridSize: false, 
        toggle: false,
        initialLoad: false
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
      console.log(profileImage, filteredUser)
    

        return (
            this.props.user ?
                <div>
                    <Grid columns={this.state.gridSize ? 3 : 2} padded='horizontally'>
                {this.state.toggle ? 
                <Grid.Column>
                    <UploadProfileImage uploaded={(e)=> this.uploadedProfileImage(e)}/>
                </Grid.Column> : null}
                <Grid.Column>
                            {filteredUser[0] && filteredUser[0].img ?
                                <Image
                                    src={filteredUser[0].img}
                                    size='medium' circular centered>
                                </Image> : null}  
                <Grid.Column/>
                </Grid.Column>
                <Grid.Column>
                <h1 centered='true'>{localStorage.firstname} {" " + localStorage.lastname}</h1>
                        <h3><a href={"mailto:" + localStorage.email}>Email User</a></h3>
                <h3>{localStorage.bio}</h3>
                <Button onClick={(e)=> this.edit(e) }>Edit</Button>
                </Grid.Column>
                </Grid>
                <ArtistsArtBoard/>
            </div>
            : <Redirect to='/login'/> 
        )
    }
}

const mapStateToProps = (state) => {
    return { art: state.art, user: state.user }
}

export default connect(mapStateToProps)(Profile)