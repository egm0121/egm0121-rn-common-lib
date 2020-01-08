/**
 * @flow
 */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { withThemedStyles } from '../styles/variables';
import AppText from './appText';

const renderTypeMap = {
  'error' : {
    icon : '✕'
  },
  'info' :{
    icon : '!'
  },
  'success':{
    icon : '✓'
  },
  'loading': {
    icon : ''
  },
}
class NotificationOverlay extends Component {
  constructor(props){
    super(props);

  }
  componentWillMount(){
    setTimeout(() => {
      console.log('notification ',this.props.id, 'will now be cleared');
      this.props.onClearNotification(this.props.id,this.props.timeout);
    },this.props.timeout);
  }
  render() {
    const styles = this.props.themeStyles;
    const typeIcon = renderTypeMap[this.props.type].icon;
    return (
        <View style={styles.notificationContainer} >
          {this.props.type === 'loading' ? 
            <ActivityIndicator animating={true} color={this.props.theme.loaderColor} style={styles.loadingIndicator} size={'large'}/> 
          : <AppText style={styles.iconText}>{typeIcon}</AppText>}
          <AppText bold={true} style={styles.messageText}>{this.props.message}</AppText>
          {this.props.children}
        </View>
    );
  }
}
NotificationOverlay.types = {
  error : 'error',
  info : 'info',
  success : 'success',
  loading : 'loading',
};
NotificationOverlay.renderForType = renderTypeMap;
NotificationOverlay.defaultProps = {
  timeout : 1500,
  type : NotificationOverlay.types.info
};
NotificationOverlay.propTypes = {
  message : PropTypes.string.isRequired,
  type : PropTypes.string,
  id :PropTypes.number.isRequired,
  timeout: PropTypes.number,
  onClearNotification: PropTypes.func.isRequired
};

const mapThemeToStyles = (THEME) => {
  return StyleSheet.create({
    notificationContainer:{
      width:180,
      height:180,
      borderRadius:10,
      paddingHorizontal:10,
      marginVertical:20,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:THEME.notifyBgColor,
      shadowColor:'rgb(0,0,0)',
      shadowRadius:20,
      //shadowOpacity:1
    },
    iconText : {
      textAlign:'center',
      fontSize:60,
      lineHeight:60,
      color: THEME.mainHighlightColor,
    },
    loadingIndicator:{
      marginBottom:20,
    },
    messageText : {
      color: THEME.mainHighlightColor,
      textAlign:'center',
      fontSize: 18
    }
  });
};

export default withThemedStyles(mapThemeToStyles)(NotificationOverlay);
