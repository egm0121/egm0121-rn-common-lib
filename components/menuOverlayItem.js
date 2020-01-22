import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { withThemedStyles } from '../styles/variables';
import AppText from './appText';

function MenuOverlayItem(props){
  const styles = props.themeStyles;
  const disabledStyle = props.disabled ? styles.disabledItem : undefined;
  return <TouchableOpacity  disabled={props.disabled} style={[styles.itemContainer,props.containerStyle]} onPress={props.onPress}>
      {props.noTextWrap ? 
      props.children :
      <AppText bold={true} style={[styles.itemText,props.textStyle,disabledStyle]}>{props.children}</AppText>
      }
    </TouchableOpacity>;
}
export default withThemedStyles(THEME => StyleSheet.create({
  itemContainer:{
    padding:Platform.select({ios:15,android: 18}),
    height:59,
    lineHeight:40,
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor: THEME.contentBorderColor
  },
  disabledItem: {
    opacity: 0.5,
  },
  itemText:{
    fontSize:17,
    color:THEME.mainHighlightColor
  }
}))(MenuOverlayItem);

