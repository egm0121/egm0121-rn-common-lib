import { actionTypes } from '../constants/actions';
let _notificationId = 0;
export function clearNotificationById(id){
  return {
    type : actionTypes.CLEAR_NOTIFICATION,
    id
  }
}

export function pushNotification(notification){
  return {
    type : actionTypes.ADD_NOTIFICATION,
    notification :{
      id: _notificationId++,
      ...notification
    }
  }
}
