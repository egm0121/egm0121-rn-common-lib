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
  return <View style={[styles.itemContainer,props.containerStyle]}>
    <TouchableOpacity onPress={props.onPress}>
      <AppText bold={true} style={[styles.itemText,props.textStyle]}>{props.children}</AppText>
    </TouchableOpacity>
  </View>;
}
export default withThemedStyles(THEME => StyleSheet.create({
  itemContainer:{
    padding:20,
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor: THEME.contentBorderColor
  },
  itemText:{
    fontSize:17,
    color:THEME.mainHighlightColor
  }
}))(MenuOverlayItem);

