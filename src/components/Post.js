import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

{/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' /> */}

class Post extends React.Component {
    state = {
        username: null
    }
        componentDidMount = () => {
            this.fetchUsername()
        }
        fetchUsername = (e) => {
            console.log('fetchusername', e)
            fetch("http://localhost:3000/retrieveUsername", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: this.props.comment['user_id'] })
            }).then(res => res.json())
                .then(data => this.setState({
                    username: data.username
                }))
        }

    render() {
        return (
            <Comment>
                <Comment.Content>
                    <Comment.Author>{this.state.username} 
                        <Comment.Metadata> wrote on {this.props.comment['created_at']}</Comment.Metadata>
                    </Comment.Author>
                    <Comment.Text>{this.props.comment.content}</Comment.Text>
                </Comment.Content>
            </Comment>)
    }
}
export default Post