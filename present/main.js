import React from 'react';
import { Container, Content, ListItem, Text, Drawer, H3, Right, Icon, Body, Toast } from 'native-base';
import { View, AsyncStorage, FlatList, ActivityIndicator } from 'react-native'
import HeaderModule from './module/header'
import SideBar from './module/sidebar'
import * as API from '../config/API'
export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      sessionId: '',
      listChances: []
    }
  }

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem('@ancucrm:sessionId');
      if (value !== null) {
        let data = await API.fetchPotentials(value)
        if (data.success === true)
          this.setState({
            loading: false,
            sessionId: value,
            listChances: data.result
          })
        // else {
        //   Toast.show({
        //     supportedOrientations: ['portrait', 'landscape'],
        //     text: 'Lỗi kết nối!',
        //     position: 'bottom',
        //   })
        // }
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  onEndReached = async () => {
    this.setState({ loading: true })
    let data = await API.fetchPotentials(this.state.sessionId, this.state.listChances.length)
    if (data.success === true) {
      this.setState({
        loading: false,
        listChances: [...this.state.listChances, ...data.result]
      })
    }
  }

  handlePress(obj) {
    this.props.navigator.push('chanceInfo', { obj: obj });
  }

  //sidebar
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

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
        <H3 style={{
          fontWeight: 'bold',
          color: '#f9c357'
        }}>{item.potentialname}</H3>
        <Text>{item.assign_info.first_name + ' ' + item.assign_info.last_name}</Text>
      </Body>
      <Right>
        <Text style={{ fontSize: 12 }}>{item.modifiedtime}</Text>
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

  render() {
    return (
      <Container>
        <HeaderModule title={'Cơ hội'}
          openDrawer={this.openDrawer.bind(this)} closeDrawer={this.closeDrawer.bind(this)} />
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this.navigator} />}
          onClose={() => this.closeDrawer()} >
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