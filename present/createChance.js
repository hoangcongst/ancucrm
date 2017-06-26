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

  render() {
    return (
      <Container>
        
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