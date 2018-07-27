import React from 'react';

import { Menu, Icon } from 'antd';
import { Link, NavLink } from 'react-router-dom';
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
                <Menu.Item key="home">
                    <Link to='/home'>
                        <Icon ><i className='fa fa-home icon'></i> </Icon>
                        <span>首页</span>
                    </Link>
                </Menu.Item>

                <SubMenu key="sub1"
                    title={<span> <Icon ><i className='fa fa-database icon'></i> </Icon><span>增删改查</span></span>}>
                    <Menu.Item key="user"> <Link to='/user'> 数据列表 </Link></Menu.Item>
                    <Menu.Item key="product"> <Link to='/crud/product'> 列表操作 </Link></Menu.Item>
                </SubMenu>

                <SubMenu key="sub2"
                    title={<span> <Icon ><i className='fa fa-database icon'></i> </Icon><span>通用</span></span>}>
                    <Menu.Item key="login"> <Link to='/login'> 登录页 </Link></Menu.Item>
                    <Menu.Item key="error"> <Link to='/error'> 错误页 </Link></Menu.Item>
                </SubMenu>

            </Menu>
        );
    }
}

export default SiderContent;