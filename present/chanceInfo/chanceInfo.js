import React from 'react';
import { Container, Content, List, ListItem, Text, H2, H3 } from 'native-base';
import { View, AsyncStorage, Image } from 'react-native'
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
            <CustormerLine name={obj.contact_info.firstname + ' ' + obj.contact_info.lastname}
              icon={require('../../images/icon-user.png')} />

            <CustormerLine name={obj.contact_info.email}
              icon={require('../../images/icon-mail.png')} />

            <CustormerLine name={obj.contact_info.mobile}
              icon={require('../../images/icon-phone.png')} />
          </Content>
          <Content style={style.jumbotron}>
            <H3 style={style.info}>Thông tin</H3>
            <InfoLine title='Ngày tạo' value={obj.createdtime} />
            <InfoLine title='Ngày sửa' value={obj.modifiedtime} />
            <InfoLine title='Giao cho' value={obj.assign_info.first_name + ' ' + obj.assign_info.last_name} />
            <Text style={style.info}>Mô tả {obj.description}</Text>
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

class CustormerLine extends React.Component {
  render() {
    return (
      <View>
        <View style={style.viewItem}>
          <Text style={style.info}>{this.props.name}</Text>
          <Image source={this.props.icon} resizeMode={Image.resizeMode.contain}
            style={{ width: 28, height: 22, flex: 1, alignItems: 'flex-end' }} />
        </View>
        <View style={style.lineSeparate} />
      </View>
    )
  }
}

class InfoLine extends React.Component {
  render() {
    return (
      <View>
        <View style={style.viewItem}>
          <Text style={style.info}>{this.props.title}</Text>
          <Text style={{ flex: 8, alignItems: 'center' }}>{this.props.value}</Text>
        </View>
        <View style={style.lineSeparate} />
      </View>
    )
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
    flex: 5,
    margin: 7
  },
  lineSeparate: {
    borderTopWidth: 0.5,
    borderColor: "#CED0CE"
  },
  viewItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 3,
    alignItems: 'center'
  }
}