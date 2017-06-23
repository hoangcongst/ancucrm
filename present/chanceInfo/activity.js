import React from 'react';
import { Container, Content, Text, H2, Right, Left, Icon, Body, ListItem } from 'native-base';
import { View, AsyncStorage } from 'react-native'
export default class Activity extends React.Component {
    render() {
        return (
            <ListItem>
                <Left>
                </Left>
                <Body>
                    <Text>{this.props.obj.date_start + '-' + this.props.obj.due_date}</Text>
                    <Text>{this.props.obj.subject}</Text>
                </Body>
                <Right></Right>
            </ListItem>
        );
    }
}