//********** Alert Plugin **********//

// Usage:
//
//   From any component the alert can be shown using `this.$alert[type]({ ...options })`.
//   The options and types are defined in the `AlertOptions` and `AlertType` interfaces below.
//
// Examples:
//
//   Using options object:
//
//   this.$alert.success({
//     title: 'Long success',
//     duration: 10000,
//     message: 'operation was a success!'
//   });
//
//   Using string:
//
//   this.$alert.error('access denied');

export const AlertType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// export const Alert = {
//   info: options,
//   success: options,
//   warning: options,
//   error: options,
// };

import Vue from 'vue';
import AlertComponent from '@/components/functional/Alert.vue';

let alertWrapper;
const wrapperId = 'c-alerts-wrapper';

alertWrapper = document.createElement('div');
alertWrapper.id = wrapperId;
document.body.prepend(alertWrapper);

const AlertConstructor = Vue.extend(AlertComponent);

const createAlertFunction = (type) => (options) => {
  let newAlertData = { type, message: '' };

  // If the user only passes a string, that should be the content
  // Otherwise pass all the inputted options to the new alert
  if (typeof options === 'string') {
    newAlertData.message = options;
  } else {
    newAlertData = {
      ...newAlertData,
      ...options,
    };
  }

  const instance = new AlertConstructor({ propsData: newAlertData });
  instance.$mount();

  alertWrapper.appendChild(instance.$el);
};

export const $alert = {
  info: createAlertFunction(AlertType.INFO),
  success: createAlertFunction(AlertType.SUCCESS),
  warning: createAlertFunction(AlertType.WARNING),
  error: createAlertFunction(AlertType.ERROR),
};
