/**
 * In-site notifications pop-up actions
 */
import { notificationActions } from '../constants/notification';

/**
 * Handle success type events
 * @param {string | Object} notification
 * */
export const onNotificationSuccessInit = (notification) => ({
  type: notificationActions.ON_NOTIFICATION_SUCCESS_INIT,
  payload: {notification, type: notificationActions.NOTIFICATION_TYPES.SUCCESS }
});

/**
 * Handle warning type events
 * @param {string | Object} notification
 * */
export const onNotificationWarningInit = (notification) => ({
  type: notificationActions.ON_NOTIFICATION_WARNING_INIT,
  payload: {notification, type: notificationActions.NOTIFICATION_TYPES.WARNING }
});


/**
 * Handle error type events
 * @param {string | Object} notification
 * */
export const onNotificationErrorInit = (notification) => ({
  type: notificationActions.ON_NOTIFICATION_ERROR_INIT,
  payload: {notification, type: notificationActions.NOTIFICATION_TYPES.ERROR }
});

/**
 * Close notification
 * */
export const onNotificationClose = () => ({type: notificationActions.ON_NOTIFICATION_CLOSE});
