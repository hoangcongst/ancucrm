import React from 'react';
import { Form, Item, Input, Container, Content, Button, Text } from 'native-base';
import { AsyncStorage } from 'react-native'
import HeaderModule from './module/header'
import SideBar from './module/sidebar'
import * as API from '../config/API'
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      pass: ""
    }
  }

  checkLogin = (data) => {
    if (data.success === true) {
      this.props.navigator.push('main');
      try {
        AsyncStorage.setItem('@ancucrm:sessionId', data.result.sessionName);
      } catch (error) {
        console.log('catch error')
        console.log(error)
      }
    }
    else
      console.log('error user')
  }

  handlePress = () => {
    API.logIn(this.state.user, this.state.pass, this.checkLogin)
  }

  setUsername(username) {
    this.setState({
      user: username
    })
  }

  render() {
    return (
      <Container>
        <Form>
          <Item>
            <Input placeholder="Username" onChangeText={username => this.setUsername(username)} />
          </Item>
          <Item>
            <Input placeholder="Password" onChangeText={pass => this.setState({ pass: pass })} />
          </Item>
          <Button primary onPress={this.handlePress}><Text>Login</Text></Button>
        </Form>
      </Container>
    );
  }
}