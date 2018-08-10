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
            menu: [
                { id: '1', icon: 'home', label: '首页', link: '/home' },
                { id: '2', icon: 'book', label: '列表', link: '/user' },
                { id: '3', icon: 'code-o', label: '复杂列表', link: '/crud/product' },
                { id: '4', icon: 'file-text', label: '表单', link: '/crud/product/save' },
                { id: '5', icon: 'share-alt', label: '详情页', link: '/crud/product/detail/26' },
                { id: '6', icon: 'eye-o', label: '登陆页', link: '/login' },
                { id: '7', icon: 'medicine-box', label: '错误页', link: '/error' },
            ]
        };

    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const { menu } = this.state;
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {
                    menu && menu.length > 0 && menu.map((item) => {
                        return <Menu.Item key={item.id}>
                            <Link to={item.link}>
                                <Icon type={item.icon} />
                                <span>{item.label}</span>
                            </Link>
                        </Menu.Item>
                    })
                }

            </Menu>
        );
    }
}

export default SiderContent;