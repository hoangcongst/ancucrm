import React from 'react';
import { Container, Content, List, ListItem, Text, Drawer, H2, Right, Icon, Body, Toast } from 'native-base';
import { View, AsyncStorage } from 'react-native'
import HeaderModule from './module/header'
import SideBar from './module/sidebar'
import * as API from '../config/API'
export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

  onEndReached = () => {
    console.log('onEndReached')
    // let data = await API.fetchPotentials(this.state.sessionId, this.state.listChances.length)
    // if (data.success === true) {
    //   this.setState({
    //     listChances: [...this.state.listChances, ...data.result]
    //   })
    // }
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

  _keyExtractor = (item, index) => item.id;
  _renderItem = () => {
    <View>
      <Body>
        <H2>{obj.potentialname}</H2>
        <Text>{obj.assign_info.first_name + ' ' + obj.assign_info.last_name}</Text>
      </Body>

      <Right>
        <Text>{obj.modifiedtime}</Text>
        <Icon name="arrow-forward" />
      </Right>
    </View>
  }

  render() {
    return (
      <Container>
        <HeaderModule title={'Cơ hội'}
          openDrawer={this.openDrawer.bind(this)} closeDrawer={this.closeDrawer.bind(this)} />
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this.navigator} />}
          onClose={() => this.closeDrawer()} >
          <Content>
            <List onEndReached={this.onEndReached} onEndReachedThreshold={0}>
              {this.state.listChances.map(
                (obj, i) => {
                  return <ListItem key={i} onPress={e => this.handlePress(obj)}>
                    <Body>
                      <H2>{obj.potentialname}</H2>
                      <Text>{obj.assign_info.first_name + ' ' + obj.assign_info.last_name}</Text>
                    </Body>

                    <Right>
                      <Text>{obj.modifiedtime}</Text>
                      <Icon name="arrow-forward" />
                    </Right>
                  </ListItem>
                }
              )}
            </List>
          </Content>
        </Drawer>
      </Container>
    );
  }
}