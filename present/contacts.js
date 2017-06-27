import React from 'react';
import {
  Container, Content, ListItem, Text, Drawer, Right, Icon,
  Body, Toast, InputGroup, Input, Button, Tab, Tabs
} from 'native-base';
import {
  View, AsyncStorage, FlatList, ActivityIndicator,
  TouchableHighlight, Modal, StyleSheet, Image
} from 'react-native'
import HeaderModule from './module/header'
import SideBar from './module/sidebar'
import * as API from '../config/API'
export default class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      sessionId: '',
      listChances: [],
      name: 'Loading...',
      email: 'Loading...',
      modalVisible: false,
    }
  }

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem('@ancucrm:sessionId');
      const name = await AsyncStorage.getItem('@ancucrm:name');
      const email = await AsyncStorage.getItem('@ancucrm:email');

      if (value !== null) {
        let data = await API.fetchContacts(value)
        if (data.success === true)
          this.setState({
            loading: false,
            sessionId: value,
            listChances: data.result,
            name: name,
            email: email,
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*
  * List chances functions 
  *
  */
  onEndReached = async () => {
    this.setState({ loading: true })
    let data = await API.fetchContacts(this.state.sessionId, this.state.listChances.length)
    console.log(data)
    if (data.success === true) {
      this.setState({
        loading: false,
        listChances: [...this.state.listChances, ...data.result]
      })
    } else {
      alert('Lỗi kết nối')
      this.setState({
        loading: true,
      })
    }
  }

  handlePress(obj) {
    this.props.navigator.push('chanceInfo', { obj: obj });
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item }) => {
    return <ListItem onPress={e => this.handlePress(item)} style={{
      marginTop: 10,
      marginRight: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#e2dfd9',
      borderLeftWidth: 5,
      borderLeftColor: '#f9c357',
      paddingLeft: 10,
    }}>
      <Body>
        <View style={style.viewItem}>
          <Image source={require('../images/icon-user.png')} resizeMode={Image.resizeMode.contain}
            style={{ width: 28, height: 22 }} />
          <Text>{item.firstname + ' ' + item.lastname}</Text>
        </View>
        <View style={style.viewItem}>
          <Image source={require('../images/icon-mail.png')} resizeMode={Image.resizeMode.contain}
            style={{ width: 28, height: 22 }} />
          <Text style={{ fontSize: 13 }}>{item.email}</Text>
        </View>
        <View style={style.viewItem}>
          <Image source={require('../images/icon-phone.png')} resizeMode={Image.resizeMode.contain}
            style={{ width: 28, height: 22 }} />
          <Text style={{ fontSize: 13 }}>{item.mobile}</Text>
        </View>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  //sidebar
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  //start popover functions
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  //end popover function

  render() {
    return (
      <Container>
        <HeaderModule title={'Liên hệ'}
          openDrawer={this.openDrawer.bind(this)} closeDrawer={this.closeDrawer.bind(this)} />
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar name={this.state.name} email={this.state.email} />}
          onClose={() => this.closeDrawer()} >

          <View searchBar rounded style={{ margin: 7 }}>
            <InputGroup>
              <Icon name='ios-search' />
              <Input placeholder='Search' />
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </InputGroup>
          </View>

          <FlatList data={this.state.listChances} onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListFooterComponent={this.renderFooter}
          />
        </Drawer>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  viewItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 3,
    alignItems: 'center'
  }
})