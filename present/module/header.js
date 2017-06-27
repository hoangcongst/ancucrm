import React, { Component } from 'react';
import {
    Container, Content, ListItem, Text, Button, Icon, Title,
    CheckBox, Header, Left, Right, Body
} from 'native-base';
import { withNavigation } from '@expo/ex-navigation';
import { COLOR_YELLOW_HARD } from '../../config/config'
@withNavigation
export default class HeaderModule extends Component {
    leftButton() {
        if (this.props.openDrawer !== undefined)
            return <Button transparent onPress={this.props.openDrawer}>
                <Icon name='menu' />
            </Button>
        else
            return <Button transparent onPress={() => this.props.navigator.pop()}>
                <Icon name='arrow-back' />
            </Button>
    }
    render() {
        return (
            <Header style={{
                backgroundColor: '#f4a742'
            }}>
                <Left>
                    {this.leftButton()}
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={this.props.rightBtnOnPress}>
                        {this.props.rightButton === undefined ? null : this.props.rightButton()}
                    </Button>
                </Right>
            </Header>
        );
    }
}