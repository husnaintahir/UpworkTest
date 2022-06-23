import { View } from 'react-native';
import React from 'react';


import { Sizing } from '../helpers/Sizing';

export const Divider = ({ marginTop = 0 }) => {
    return (
        <View
            style={{ marginTop: Sizing(marginTop) }}
        />
    );
}