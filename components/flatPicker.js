/**
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import THEME from '../styles/variables';
import MenuOverlay from './menuOverlay';
import FilterInput from './filterInput';
import AppText from './appText';
import { withThemedStyles } from '../styles/variables';

class FlatPicker extends Component {
  constructor(props){
    super(props);
    this.state = { filterValue:'' };
    this.onOptionPress = this.onOptionPress.bind(this);
    this.renderRowWithData = this.renderRowWithData.bind(this);
    this.onFilterTextChange = this.onFilterTextChange.bind(this);
  }
  componentDidMount(){
    console.log('FlatPicker component mounted');
  }
  onFilterTextChange(value){
    this.setState({filterValue: value})
  }
  onOptionPress(value) {
    this.props.onValueChange(value);
  }
  renderRowWithData(rowInfo) {
    const styles = this.props.themeStyles;
    const rowData = rowInfo.item;
    if(!rowData)return null;
    const isSelected = rowData.value === this.props.selected;
    const selectedStyle = isSelected ? [styles.selectedOption] :[];
    const selectedTextStyle =  isSelected ? [styles.selectedOptionText] :[];
    return <View style={[styles.optionRow,selectedStyle]} >
          <TouchableOpacity style={styles.touchable} onPress={this.onOptionPress.bind(this,rowData.value)}>
            <AppText bold={true} style={[styles.itemText, selectedTextStyle]} numberOfLines={1} ellipsizeMode={'tail'} >
              {rowData.label}
            </AppText>
          </TouchableOpacity>
      </View>;
  }
  render() {
    return (
      <MenuOverlay {...this.props}>
         <FilterInput
            placeholder={this.props.filterPlaceholder}
            value={this.state.filterValue}
            onChangeText={this.onFilterTextChange}
            onClearFilter={this.onFilterTextChange.bind(this,'')}
            />
         <FlatList 
          extraData={this.props.selected}
          data={this.props.options.filter(item => !this.state.filterValue || item.label.toLowerCase().indexOf(this.state.filterValue.toLowerCase()) > -1)}
          keyExtractor={(item,idx) => `${idx}` }
          renderItem={this.renderRowWithData}
        />
      </MenuOverlay>
    );
  }
}

FlatPicker.defaultProps = {
  filterPlaceholder: 'Search'
};
FlatPicker.propTypes = {
  options : PropTypes.arrayOf(PropTypes.object),
  selected : PropTypes.string.isRequired,
  onValueChange : PropTypes.func,
  onClose: PropTypes.func.isRequired
};
const mapThemeToStyles = (THEME) => {
  console.log('flatPicker map styles to theme',THEME)
  return StyleSheet.create({
    container:{
      left:0,
      right:0,
      height:300,
      bottom:0,
      position:'absolute',
      backgroundColor:THEME.mainBgColor,
      opacity: 0.95
    },
    touchable: {
      flex: 1,
      alignItems: 'center'
    },
    itemText : {
      color: THEME.mainColor,
      fontSize: 16,
    },
    optionRow: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    closeButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderTopColor:  THEME.contentBorderColor,
      borderTopWidth: 1,
      height:35,
      borderBottomColor: THEME.contentBorderColor,
      borderBottomWidth:1,
      paddingRight:10
    },
    selectedOption:{
      backgroundColor: THEME.contentBorderColor,
    },
    selectedOptionText:{
      color: THEME.mainHighlightColor,
    },
    itemStyle: {
      color:THEME.mainHighlightColor,
    },
  });
};

export default withThemedStyles(mapThemeToStyles)(FlatPicker);