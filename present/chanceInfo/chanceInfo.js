import React from 'react';
import { Container, Content, List, ListItem, Text, H2 } from 'native-base';
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
        <Content>
          <H2>
            {obj.proten}
          </H2>
          <Content>
            <H2>Khách hàng</H2>
            <Text>{obj.contact_info.firstname + ' ' + obj.contact_info.lastname}</Text>
            <Text>{obj.contact_info.email}</Text>
            <Text>{obj.contact_info.mobile}</Text>
          </Content>
          <Content>
            <H2>Thông tin</H2>
            <Text>Ngày tạo: {obj.createdtime}</Text>
            <Text>Ngày sửa: {obj.modifiedtime}</Text>
            <Text>Giao cho: {obj.assign_info.first_name + ' ' + obj.assign_info.last_name}</Text>
            <Text>Mô tả: {obj.description}</Text>
          </Content>
          <Content>
            <Text onPress={() => this.props.navigator.push('specificInfo', { data: this.state.activity, 
              type: 2, title: 'Hoạt động' })}>Hoạt động: {this.state.activity.length}</Text>
            <Text>Bình luận: {this.state.comments.length}</Text>
            <Text onPress={() => this.props.navigator.push('specificInfo', { data: this.state.history, 
              type: 1, title: 'Lịch sử' })}>
              Lịch sử: {this.state.history.length}</Text>
          </Content>
        </Content>
      </Container>
    );
  }
}