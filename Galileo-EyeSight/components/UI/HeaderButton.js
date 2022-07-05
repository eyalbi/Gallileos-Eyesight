import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import {Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../constans/Colors";

const CustomHeaderButton = props => {
    return <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={28}
        color={'white'}
    />;
};

export default CustomHeaderButton