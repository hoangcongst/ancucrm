import React from 'react';
import { Form, Item, Input, Container, Content, Button } from 'native-base';
import { AsyncStorage, Image, StyleSheet, View, Text, KeyboardAvoidingView, TextInput } from 'react-native'
import HeaderModule from './module/header'
import SideBar from './module/sidebar'
import * as API from '../config/API'

export default class CreateChance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "ando",
      pass: "123456"
    }
  }

  rightButton = () => {
    return <Text>Lưu</Text>
  }

  rightBtnOnPress = () => {
    alert('Lưu thành công!')
    this.props.navigator.pop()
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position">
        <HeaderModule title={'Thêm cơ hội'} rightButton={this.rightButton} rightBtnOnPress={this.rightBtnOnPress}/>
        <View style={styles.content}>
          <Text style={styles.label} >Tên cơ hội: </Text>
          <TextInput style={styles.textInput} placeholder='Nhập tên cơ hội' />
          <View style={styles.lineSeparate} />
          <Text style={styles.label} >Loại yêu cầu: </Text>
          <TextInput style={styles.textInput} placeholder='Nhập tên cơ hội' />
          <View style={styles.lineSeparate} />
          <Text style={styles.label} >Giai đoạn bán hàng: </Text>
          <TextInput style={styles.textInput} placeholder='Nhập tên cơ hội' />
          <View style={styles.lineSeparate} />
          <Text style={styles.label} >Giao cho: </Text>
          <TextInput style={styles.textInput} placeholder='Nhập tên cơ hội' />
          <View style={styles.lineSeparate} />
          <Text style={styles.label} >Giá (tr): </Text>
          <TextInput style={styles.textInput} placeholder='Nhập tên cơ hội' />
          <View style={styles.lineSeparate} />
          <Text style={styles.label} >Tên khách hàng: </Text>
          <TextInput style={styles.textInput} placeholder='Nhập tên cơ hội' />
          <View style={styles.lineSeparate} />
          <Text style={styles.label} >Tên dự án: </Text>
          <TextInput style={styles.textInput} placeholder='Nhập tên cơ hội' />
          <View style={styles.lineSeparate} />
          <Text style={styles.label} >Mô tả: </Text>
          <TextInput style={styles.textInput} placeholder='Nhập tên cơ hội' />
          <View style={styles.lineSeparate} />
        </View>
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
  },
  content: {
    padding: 10
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  label: {
    marginTop: 10,
    fontSize: 12,
    color: '#f4a742'
  },
  lineSeparate: {
    borderTopWidth: 0.5,
    borderColor: "#CED0CE"
  }
})