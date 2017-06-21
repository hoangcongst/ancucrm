import React from 'react';
import { Container, Content, List, ListItem, Text, Drawer, H2, Right, Icon, Body } from 'native-base';
import { View } from 'react-native'
import HeaderModule from './module/header'
import SideBar from './module/sidebar'

export default class Main extends React.Component {
  handlePress = () => {
    this.props.navigator.push('chanceInfo');
  }

  printChances() {
    var print = []
    for (i = 0; i < 300; i++) {
      print.push(
        <ListItem key={i} onPress={this.handlePress}>
          <Body>
            <H2>ten du an</H2>
            <Text>Nguoi nhan du an</Text>
          </Body>

          <Right>
            <Text>28/2/2017</Text>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      )
    }

    return (
      print
    )
  }

  //sidebar
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
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
          <Content>
            <List>
              {this.printChances()}
            </List>
          </Content>
        </Drawer>
      </Container>
    );
  }
}