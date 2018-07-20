import React from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import './style.scss';
import 'antd/lib/dropdown/style/index.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a>退出</a>
        </Menu.Item>
    </Menu>
);

class HeaderContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
        }
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div className='header-content'>
                <Menu
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
                </Menu>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="dropdown-link" href="#">
                    <i  className='fa fa-user-o'/>  Welecom Admin <i  className='fa fa-angle-down'/> <Icon type="down" />
                    </a>
                </Dropdown>
            </div>
        );
    }
}

export default HeaderContent;