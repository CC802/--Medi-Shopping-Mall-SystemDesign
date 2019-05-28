import {
    Autocomplete,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Container,
    Header,
    Aside,
    Main,
    Footer
} from 'element-ui';

let components = [
    Autocomplete,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Container,
    Header,
    Aside,
    Main,
    Footer
]

export default function plugin(Vue) {

    components.map(c => {
        Vue.use(c)
    })

}



