import React, { FC } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface IconProps {
    color?: string;
    size?: number;
    name: string;
    iconFamily: 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'AntDesign'
}

const Icon: FC<IconProps> = ({ color, size, name, iconFamily }) => {
    return (
        <>
            {iconFamily === 'Ionicons' && <Ionicons name={name} size={size} color={color} />}
            {iconFamily === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={name} size={size} color={color} />}
            {iconFamily === 'MaterialIcons' && <MaterialIcons name={name} size={size} color={color} />}
            {iconFamily === 'AntDesign' && <AntDesign name={name} size={size} color={color} />}
        </>
    )
}

export default Icon