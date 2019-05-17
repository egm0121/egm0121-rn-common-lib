import React, { PropTypes, Component } from 'react';
import { Text } from 'react-native';
import { withTheme } from '../styles/variables';

export default withTheme(function AppText(props){
  const initialStyle = {
    fontFamily: props.bold ?
      props.theme.appContentBoldFontFamily : props.theme.appContentFontFamily,
  };
  let styles = [];
  if(props.style){
    styles = Array.isArray(props.style) ? props.style : [props.style];
  }
  return <Text {...props} style={[initialStyle].concat(styles)} >
  {props.children}
  </Text>
});