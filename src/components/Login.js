import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom';
import artShareLogo from '../images/logo.png'

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  saveForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  reload = () => (
    this.props.user ? null : window.location.reload()
  )

  login = (e) => {
    e.preventDefault();
    fetch("https://calm-temple-41350.herokuapp.com/login", {
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
        localStorage.setItem('email', payload.email)
        localStorage.setItem('lastname', payload.lastname)
        localStorage.setItem('bio', payload.bio)
        this.props.setUser(payload.firstname)
        localStorage.setItem('user', payload.firstname)
      })
    this.setState({
      username: null, password: null
    })
  };

  render() {
    return (
      <div className='login-form'>
        {this.props.user ? <Redirect to='/' /> : null}

        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>

            <Header as='h2' color='teal' textAlign='center'>
              <Image src={artShareLogo} style={{ height: "300px", width: "300px" }} />
            </Header>

            <Form size='large' >
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='username'
                name="username"
                onChange={(e) => this.saveForm(e)} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={(e) => this.saveForm(e)}
              />
              <Button
                color='black'
                fluid size='large'
                onClick={(e) => this.login(e)}>
                Login
              </Button>
            </Form>
            <Message color="black">
              <Link to="/SignUp">
                <Button>Create Account
                </Button>
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login;