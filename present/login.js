import React from 'react';
import { Form, Item, Input, Container, Content, Button, Text } from 'native-base';
import { AsyncStorage, Image, StyleSheet } from 'react-native'
import HeaderModule from './module/header'
import SideBar from './module/sidebar'
import * as API from '../config/API'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "ando",
      pass: "123456"
    }
  }

  checkLogin = (data) => {
    if (data.success === true) {
      this.props.navigator.push('main');
      try {
        AsyncStorage.setItem('@ancucrm:sessionId', data.result.sessionName);
        AsyncStorage.setItem('@ancucrm:name', data.result.user_info.first_name + ' ' +
          data.result.user_info.last_name);
        if (data.result.user_info.email1 !== undefined)
          AsyncStorage.setItem('@ancucrm:email', data.result.user_info.email1);
        else
          AsyncStorage.setItem('@ancucrm:email', '');
      } catch (error) {
        alert('Lỗi kết nối!')
      }
    }
    else
      alert('Username/Password không đúng!')
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
        <Image source={require('../images/bg-login.png')} style={styles.backgroundImage} resizeMode={Image.resizeMode.sretch}>
          <Form>
            <Item>
              <Input placeholder="Username" onChangeText={username => this.setUsername(username)} />
            </Item>
            <Item>
              <Input placeholder="Password" onChangeText={pass => this.setState({ pass: pass })} />
            </Item>
            <Button primary onPress={this.handlePress}><Text>Login</Text></Button>
          </Form>
        </Image>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }
})