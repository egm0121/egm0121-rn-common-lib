import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  ListView,
  ActivityIndicator,
  View,
  TouchableOpacity
} from 'react-native';
import { withTheme } from '../styles/variables';

class FilterInput extends Component{
  constructor(props){
    super(props);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this.state = {
      isFocused : false
    }
  }
  _onFocus(...args){
    this.setState({isFocused:true});
    if(this.props.onFocus){
      this.props.onFocus(...args);
    }
  }
  _onBlur(...args){
    this.setState({isFocused:false});
    if(this.props.onBlur){
      this.props.onBlur(...args);
    }
  }
  getStyles() {
    const THEME = this.props.theme;
    return StyleSheet.create({
      filterInput : {
        height: 30,
        color: THEME.mainColor,
        paddingLeft: 15,
        paddingRight: 30,
        paddingVertical: 0,
        lineHeight: 20,
        fontSize: 14
      },
      activeFilter:{
        backgroundColor : THEME.tabBarBorderColor
      },
      activeFilterInput:{
        color: THEME.mainHighlightColor
      },
      filterInputView :{
        height:30,
        margin:10,
        borderRadius:20,
        backgroundColor : THEME.contentBorderColor
      },
      focusedFilterInputView:{
      },
      focusedFilterInput:{
        color: THEME.mainHighlightColor
      },
      clearAction:{
        position:'absolute',
        right:5,
        top:0,
        zIndex:10,
        height:30,
        width:30
      },
      clearActionText:{
        color: THEME.mainColor,
        fontSize:20,
        lineHeight:28,
        textAlign:'center'
      }
    });
  }
  render(){
    let isEmpty = !this.props.value || this.props.value.length == 0;
    let clearButtonOpacity = isEmpty ? 0 : 1;
    let styles = this.getStyles();
    let inputViewStyle = [styles.filterInputView,this.props.inputViewStyle];
    let inputStyle = [styles.filterInput,this.props.inputStyle];
    if(this.state.isFocused){
      inputViewStyle.push(styles.focusedFilterInputView);
    }
    if(!isEmpty){
      inputViewStyle.push(styles.activeFilter);
      inputStyle.push(styles.activeFilterInput);
    }
    return (
       <View style={inputViewStyle}>
         { !isEmpty ? <View style={[styles.clearAction]}>
           <TouchableOpacity onPress={this.props.onClearFilter} >
             <Text style={styles.clearActionText}>✕</Text>
           </TouchableOpacity>
         </View> : <View style={[styles.clearAction]}>
           {this.props.placeholderComponent}
         </View>}
         <TextInput
           style={inputStyle}
           placeholder={this.props.placeholder}
           value={this.props.value}
           placeholderTextColor={this.props.theme.mainColor}
           {...this.props}
           onBlur={this._onBlur}
           onFocus={this._onFocus}
         />
       </View>);
  }
}
FilterInput.defaultProps = {
  placeholderComponent: null,
};
FilterInput.propTypes = {
  onClearFilter: PropTypes.func
};

export default withTheme(FilterInput);
