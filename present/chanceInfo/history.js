import React from 'react';
import { Container, Content, Text, H2, Right, Left, Icon, Body, ListItem } from 'native-base';
import { View, AsyncStorage } from 'react-native'
export default class History extends React.Component {
    printBody() {
        obj = this.props.obj
        if (obj.status === 'fromTo')
            return obj.who + 'đã cập nhật ' + obj.fieldname + ': từ '
                + obj.prevalue + ' thành ' + obj.postvalue
        else if (obj.status === 'changedTo')
            return obj.who + ' đã thay đổi ' + obj.fieldname + ': tới ' + obj.postvalue
        else
            return obj.who + ' ' + obj.fieldname + ': đã xóa ' + obj.prevalue
    }

    render() {
        return (
            <ListItem>
                <Left>
                    <Text>{this.props.obj.who}</Text>
                </Left>
                <Body>
                    <Text>{this.printBody()}</Text>
                    <Text>{this.props.obj.changedon}</Text>
                </Body>
                <Right></Right>
            </ListItem>
        );
    }
}