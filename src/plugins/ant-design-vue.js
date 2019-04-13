import Vue from 'vue'
import {
    Alert, Avatar, Button, Badge, Checkbox, Divider,
    Drawer, Form, Dropdown,
    Pagination, Popover,
    Menu,
    Input, Icon, notification,
    Layout, List,
    Switch, Select,
    Tooltip, Tag,
} from 'ant-design-vue'
import { LocaleProvider } from 'ant-design-vue'

Vue.prototype.$notification = notification;

Vue.use(Alert)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Dropdown)
Vue.use(LocaleProvider)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Layout)
Vue.use(Drawer)
Vue.use(Divider)
Vue.use(Popover)
Vue.use(Switch)
Vue.use(List)
Vue.use(Select)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Menu)
Vue.component(Layout.Header.name, Layout.Header)