import React, { Component } from 'react';
import {
    Container, Content, ListItem, Text, Button, Icon, Title,
    CheckBox, Header, Left, Right, Body
} from 'native-base';
export default class HeaderModule extends Component {
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Right>
            </Header>
        );
    }
}