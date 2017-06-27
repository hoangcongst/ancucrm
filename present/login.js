import React from 'react';
import { Form, Item, Input, Container, Content, Button, Text } from 'native-base';
import { AsyncStorage, Image, StyleSheet, BackHandler } from 'react-native'
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

    // BackHandler.addEventListener('hardwareBackPress', function () {
    //   if (this.props.route.routeName === 'login')
    //     return true
    //   else return false
    // });
  }

  checkLogin = async (data) => {
    if (data.success === true) {
      try {
        await AsyncStorage.setItem('@ancucrm:sessionId', data.result.sessionName);
        await AsyncStorage.setItem('@ancucrm:name', data.result.user_info.first_name + ' ' +
          data.result.user_info.last_name);
        if (data.result.user_info.email1 !== undefined)
          await AsyncStorage.setItem('@ancucrm:email', data.result.user_info.email1);
        else
          await AsyncStorage.setItem('@ancucrm:email', '');

        this.props.navigator.push('main');
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
          <Image source={require('../images/logo.png')} style={styles.logo} resizeMode={Image.resizeMode.contain}></Image>
          <Form style={{
            flex: 3,
            height: '30%',
            alignItems: 'center',
            margin: 15
          }}>
            <Item rounded>
              <Input placeholder="Tài khoản" onChangeText={username => this.setUsername(username)} />
            </Item>
            <Item rounded style={{ marginTop: 10 }}>
              <Input placeholder="Mật khẩu" onChangeText={pass => this.setState({ pass: pass })} />
            </Item>
            <Button full onPress={this.handlePress} style={{
              marginTop: 10,
              backgroundColor: '#f9c357',
              borderRadius: 5,
            }}><Text>Đăng nhập</Text></Button>
          </Form>
        </Image>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  logo: {
    flex: 2,
    width: '60%',
    height: 100
  }
})