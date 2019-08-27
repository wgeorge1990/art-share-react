import React from 'react';
import { Button, Checkbox, Form, Container, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



class CreateAccountForm extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: ''
  }

  handleFormInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  redirectHome = () => (
    <Redirect to='/' />
  )

  signUp = (e) => {
    let newUser
    e.preventDefault();
    fetch("https://art-share-rails.herokuapp.com/users", {
      method: 'POST', body: JSON.stringify({

        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => this.login(data))

  }

  login = (e, data) => {
    fetch("https://art-share-rails.herokuapp.com/login", {
      method: 'POST', body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(payload => {
        localStorage.setItem('token', payload.token)
        localStorage.setItem('firstname', payload.firstname)
        localStorage.setItem('user_id', payload.id)
        this.props.setUser(payload.firstname)
        localStorage.setItem('user', payload.firstname)
      })
  };

  render() {
    return (
      <Container>
        {this.props.user ? <Redirect to='/BrowseAllArt' /> :
          <Form onSubmit={(e) => this.signUp(e)}>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder='First Name'
                name="firstname"
                onChange={(e) => this.handleFormInputs(e)} />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder='Last Name'
                name="lastname"
                onChange={(e) => this.handleFormInputs(e)} />
            </Form.Field>
            <Form.Field>
              <label>User Name</label>
              <input
                placeholder='User Name'
                name="username"
                onChange={(e) => this.handleFormInputs(e)} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder='Email'
                name="email"
                onChange={(e) => this.handleFormInputs(e)} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder='Password'
                name="password"
                type="password"
                onChange={(e) => this.handleFormInputs(e)} />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        }
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return { user: state.user }
}
export default connect(mapStateToProps)(CreateAccountForm)
