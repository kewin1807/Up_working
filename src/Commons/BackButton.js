import React, {Component} from 'react';
import {
    TouchableOpacity
} from 'react-native';
import Icon from './Icon';
import * as color from '../Styles/colorDark';
import part from '../Styles/partStyle';
import * as size from '../Styles/size';

class BackButton extends Component{
    render(){
        return(
            <TouchableOpacity
                style={[part.padding, part.wrapperBackButton]}
                onPress={() => this.props.goBack(null)}
            >
                <Icon name="entypo|chevron-thin-left"
                      size={size.iconBig}
                      color={color.textColor}
                />
            </TouchableOpacity>
        );
    }
}

export default BackButton;