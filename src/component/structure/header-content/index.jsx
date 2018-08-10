import React from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import Common from 'util/common.jsx';
import User from 'service/user-service.jsx';
import './style.scss';
import 'antd/lib/dropdown/style/index.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const _common = new Common();
const _user = new User();

class HeaderContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            username: _common.getStorage('userInfo').username || ''
        }
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
    }

    menu() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={this.logout.bind(this)}>退出</a>
                </Menu.Item>
            </Menu>
        )
        return menu;
    }


    logout() {
        _user.logout().then(res => {
            _common.removeStorage('userInfo');
            window.location.href = '/login';
        }, errMsg => {
            _common.errorTips(errMsg);
        })
    }

    render() {
        const { username } = this.state;
        return (
            <div className='header-content'>
                <div className='header-menu'>
                    {/*   <Menu
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="mail">
                        <Icon type="mail" />Navigation One
              </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
                        <MenuItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu> */}
                </div>
                <div className='header-dropdown'>
                    <Dropdown overlay={this.menu()} trigger={['click']}>
                        <a className="dropdown-link" href="#">
                            <Icon type='user' /> {username}  <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default HeaderContent;