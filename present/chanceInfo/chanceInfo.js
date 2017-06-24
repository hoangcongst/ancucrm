import React from 'react';
import { Container, Content, List, ListItem, Text, H2, H3 } from 'native-base';
import { View, AsyncStorage } from 'react-native'
import HeaderModule from '../module/header'
import * as API from '../../config/API'
export default class ChanceInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [],
      comments: [],
      activity: []
    }
  }

  async componentDidMount() {
    const sessionId = await AsyncStorage.getItem('@ancucrm:sessionId');
    if (sessionId !== null) {
      let obj = this.props.obj
      let history = await API.fetchHistory('Potentials', obj.id, sessionId)
      let comments = await API.fetchComment(obj.id, sessionId)
      let activity = await API.fetchActivity({
        sessionName: sessionId,
        idRecord: obj.id,
      })

      this.setState({
        history: history,
        comments: comments.result,
        activity: activity
      })
    }
  }

  render() {
    let obj = this.props.obj
    obj.contact_info = obj.contact_info === undefined ? {
      firstname: '', lastname: ''
      , email: '', mobile: ''
    } : obj.contact_info

    obj.assign_info = obj.assign_info === undefined ? {} : obj.assign_info
    return (
      <Container>
        <HeaderModule title='Chi tiết cơ hội' />
        <Content style={{
          backgroundColor: '#efeeea'
        }}>
          <H2>
            {obj.proten}
          </H2>
          <Content style={style.jumbotron}>
            <H3 style={style.info}>Khách hàng</H3>
            <Text style={style.info}>{obj.contact_info.firstname + ' ' + obj.contact_info.lastname}</Text>
            <View style={style.lineSeparate} />
            <Text style={style.info}>{obj.contact_info.email}</Text>
            <View style={style.lineSeparate} />
            <Text style={style.info}>{obj.contact_info.mobile}</Text>
          </Content>
          <Content style={style.jumbotron}>
            <H3 style={style.info}>Thông tin</H3>
            <Text style={style.info}>Ngày tạo: {obj.createdtime}</Text>
            <View style={style.lineSeparate} />
            <Text style={style.info}>Ngày sửa: {obj.modifiedtime}</Text>
            <View style={style.lineSeparate} />
            <Text style={style.info}>Giao cho: {obj.assign_info.first_name + ' ' + obj.assign_info.last_name}</Text>
            <View style={style.lineSeparate} />
            <Text style={style.info}>Mô tả: {obj.description}</Text>
          </Content>
          <Content style={style.jumbotron}>
            <Text style={style.info} onPress={() => this.props.navigator.push('specificInfo', {
              data: this.state.activity,
              type: 2, title: 'Hoạt động'
            })}>Hoạt động: {this.state.activity.length}</Text>
            <View style={style.lineSeparate} />
            <Text style={style.info}>Bình luận: {this.state.comments.length}</Text>
            <View style={style.lineSeparate} />
            <Text style={style.info} onPress={() => this.props.navigator.push('specificInfo', {
              data: this.state.history,
              type: 1, title: 'Lịch sử'
            })}>
              Lịch sử: {this.state.history.length}</Text>
          </Content>
        </Content>
      </Container>
    );
  }
}

const style = {
  jumbotron: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 10
  },

  info: {
    margin: 7
  },
  lineSeparate: {
    borderTopWidth: 0.5,
    borderColor: "#CED0CE"
  }
}