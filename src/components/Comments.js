import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Post from './Post'

class ArtCommentForm extends React.Component {
    state ={
        comments: null,
        content: "",
        toggleComments: false
    }
    
    componentDidMount = () => {
        this.fetchPhotosComments() 
    }

    fetchPhotosComments = (e) => {
        fetch("http://localhost:3000/fetchcomments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({photo_id: this.props.imageId})
        }).then(res => res.json())
            .then(data => this.setState({
                comments: data
            }))
    }

    createComment = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                photo_id: this.props.imageId,
                user_id: localStorage.getItem('user_id'),
                content: this.state.content
             })
        }).then(res => res.json())
            .then(data => this.fetchPhotosComments(data))
            this.setState({
                content: ""
            })
        }

    setContent = (e) => {
        this.setState({
            content: e.target.value
        })

    } 

    showComments = (e) => {
        this.setState({
            toggleComments: !this.state.toggleComments
        })
    }
    

    render(){
        return (
            <Comment.Group>
                <Form reply id='commentForm' >
                    <Form.TextArea
                        value={this.state.content}
                        name="content"
                        onChange={(e) => this.setContent(e)} />
                    <Button
                        fluid
                        content='Add Reply'
                        labelPosition='left'
                        icon='edit'
                        primary
                        onClick={(e) => this.createComment(e)} />
                </Form>
                <Button fluid onClick={(e)=> this.showComments(e)}>
                  Show  Comments
                </Button>

            {this.state.toggleComments ? 

            this.state.comments !== null ? this.state.comments.map(comment => <Post comment={comment} key={comment.id} /> ) : null
           
           : null}
               
            </Comment.Group>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}
    

export default connect(mapStateToProps)(ArtCommentForm)
