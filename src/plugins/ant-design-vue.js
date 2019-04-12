import Vue from 'vue'
import {
    Pagination, Button, Form,
    Input, Icon, Checkbox, notification
} from 'ant-design-vue'
import { LocaleProvider } from 'ant-design-vue'

Vue.prototype.$notification = notification;

Vue.use(LocaleProvider)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Checkbox)