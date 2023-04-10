/**
  提供一个全局Vue bus做事件通信
*/

import Vue from 'vue'
const Event = new Vue()
Event.emit = Event.$emit
Event.on = Event.$on
Event.once = Event.$once
Event.off = Event.$off
export default Event