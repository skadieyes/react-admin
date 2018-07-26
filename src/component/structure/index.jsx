import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Tooltip } from 'antd';
import HeaderContent from './header-content/index.jsx';
import SiderContent from './sider-content/index.jsx';
import 'antd/lib/layout/style/index.less';
import 'antd/lib/menu/style/index.less';
import 'antd/lib/tooltip/style/index.less';
import './style.scss';
const { Header, Sider, Content } = Layout;


class Structure extends React.Component {
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
            <Layout className='layout'>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" >
                        <Link className='logo-link' to='/'>
                        </Link>
                    </div>
                    <SiderContent />
                </Sider>
                <Layout>
                    <Header className='header'>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle.bind(this)}
                        />
                        <HeaderContent> </HeaderContent>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: '0 24px',  minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Structure;
