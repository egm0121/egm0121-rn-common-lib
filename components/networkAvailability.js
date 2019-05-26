import React, { Component } from 'react';
import {
  NetInfo
} from 'react-native';
let networkStateCache = {
  isOnline : false,
  connectionInfo : null
};
class NetworkAvailability extends Component{
  constructor(props){
    super(props);
    this.state = networkStateCache;
    this.updateNetworkState = this.updateNetworkState.bind(this);
  }
  componentWillMount(){
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.updateNetworkState(connectionInfo);
    });
    NetInfo.addEventListener(
      'connectionChange',
      this.updateNetworkState
    );
  }
  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.updateNetworkState
    );
  }
  updateNetworkState(connInfo){
    console.log('update network state',connInfo);
    const connType = connInfo.type;
    this.setState({
      isOnline: connType != 'none',
      connectionInfo: connType
    },() => networkStateCache = this.state);
    
  }
  render(){
    return this.props.children(this.state.isOnline,this.state.connectionInfo);
  }
}
export default NetworkAvailability;
