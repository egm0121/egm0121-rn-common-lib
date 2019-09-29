import React from 'react';
import { ImageBackground } from 'react-native';

export default class DefaultImageBackground extends React.Component {
  static defaultProps = {
    source: null,
    onError: () => {},
    fallbackSource: null
  }

  state = { useFallback: false }

  onError = error => {
    this.props.onError(error);
    this.setState({ useFallback: true });
  }
  componentDidUpdate(prevProps){
    if( prevProps.source && this.props.source &&
       prevProps.source.uri !== this.props.source.uri){
      this.setState({ useFallback: false });
    }
  }
  render() {
    const { onError, source, fallbackSource, ...rest } = this.props;
    const imageSource = this.state.useFallback ?  fallbackSource : source; 
    return (
      <ImageBackground
        source={imageSource}
        onError={this.onError}
        {...rest}
      />
    );
  }
}