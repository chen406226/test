import AttendDate from './src/ncDate';

/* istanbul ignore next */
AttendDate.install = function(Vue) {
  Vue.component(AttendDate.name, AttendDate);
};

export default AttendDate;
