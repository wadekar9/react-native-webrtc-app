import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

const buttonStyle = {
  height: 50,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

interface IconContainerProps {
    backgroundColor: string;
    onPress : () => void;
    Icon : React.ReactNode;
    style : StyleProp<ViewStyle>;
}

const IconContainer : React.FC<IconContainerProps> = ({backgroundColor, onPress, Icon, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
        borderRadius: 30,
        height: 60,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon />
    </TouchableOpacity>
  );
};
export default IconContainer;
