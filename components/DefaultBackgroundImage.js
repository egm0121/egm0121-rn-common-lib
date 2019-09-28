import React from 'react';
import { ImageBackground } from 'react-native';

export default class DefaultImageBackground extends React.Component {
  static defaultProps = {
    source: [],
    onError: () => {},
  }

  state = { current: 0 }

  onError = error => {
    this.props.onError(error);
    const next = this.state.current + 1;
    if (next < this.props.source.length) {
      this.setState({ current: next });
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.source !== this.props.source){
      this.setState({current: 0});
    }
  }
  render() {
    const { onError, source, ...rest } = this.props;
    return (
      <ImageBackground
        source={source[this.state.current]}
        onError={this.onError}
        {...rest}
      />
    );
  }
}