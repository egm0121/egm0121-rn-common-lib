import React from 'react';

const themeVariables = {
  activeBorderColor: '#2395CB',
  mainBgColor: '#d0ccb7',
  mainHighlightColor: '#101a18',
  mainActiveColor: '#da3b34',
  mainColor : '#2395CB',
  contentBgColor : '#07100e',
  contentBorderColor : 'rgba(71, 71, 72, 0.3)',
  tabBarBorderColor : '#383838',
  tabBarSecondaryBorderColor: '#262626',
  textOverlayBgColor : 'rgba(18, 19, 20,0.5)',
  imageTextOverlayBgColor : 'rgba(41,41,46,0.9)',
  notifyBgColor : 'rgba(41,41,46,0.9)',
  listBorderColor : '#39393a',
  viewportBorderRadius : 3,
  discoveryColor : 'blue',
  appContentFontFamily: 'normal',
  appContentBoldFontFamily: 'normal',
};

export function setCustomTheme(customObj) {
  Object.keys(customObj).forEach(key => {
    if( key in themeVariables ){
      themeVariables[key] = customObj[key];
    }
  });  
};

const ThemeContext = React.createContext(themeVariables);
const ThemeProvider = (props) => {
  return <ThemeContext.Provider value={themeVariables}>
  {props.children}
  </ThemeContext.Provider>
}
const withTheme = (Component) => {
  return ( props ) => {
    return <ThemeContext.Consumer>{(theme) => {
      return <Component {...props} theme={theme} />
    }
  }</ThemeContext.Consumer>
  }
}
export { ThemeContext, withTheme, ThemeProvider };

export default themeVariables;