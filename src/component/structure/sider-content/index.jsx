import React from 'react';

import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style/index.less';
import './style.scss';

const SubMenu = Menu.SubMenu;
class SiderContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };

    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Icon ><i className='fa fa-bolt icon'></i> </Icon>
                    <span>nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon><i className='fa fa-adjust icon'></i> </Icon>
                    <span>nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon><i className='fa fa-bicycle icon'></i> </Icon>
                    <span>nav 3</span>
                </Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default SiderContent;