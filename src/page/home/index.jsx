import React from 'react';
import Title from 'component/structure/title/index.jsx'
import { Link } from 'react-router-dom';
import Statistic from 'service/statistic-service.jsx'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import './style.scss';
import 'antd/lib/card/style/index.less';
import 'antd/lib/grid/style/index.less';

const _statistic = new Statistic();
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: '-',
            productCount: '-',
            orderCount: '-'
        }
        this.loadCount();
    }
    loadCount() {
        _statistic.getHomeCount().then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    render() {
        const { userCount, productCount, orderCount } = this.state;
        return (
            <div className='home'>
                <Title title={'Home'} >
                </Title>
                <Row className='row' gutter={32}>
                    <Col span={8} >
                        <Link to="/user">
                            <div className='card-box'>
                                <div className='title'>
                                    <i className='fa fa-user-o' />
                                </div>
                                <Card bordered={false} className='card'>
                                    <div className='content'>
                                        <div className='label'>
                                            用户总量
                                </div>
                                        <div className='count'>
                                            {userCount}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Link>
                    </Col>
                    <Col span={8} >
                        <div className='card-box'>
                            <div className='title yellow'>
                                <i className='fa fa-diamond' />
                            </div>
                            <Card bordered={false} className='card'>
                                <div className='content'>
                                    <div className='label'>
                                        商品总量
                                </div>
                                    <div className='count'>
                                        {productCount}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col span={8} >
                        <div className='card-box'>
                            <div className='title blue'>
                                <i className='fa fa-paper-plane-o' />
                            </div>
                            <Card bordered={false} className='card'>
                                <div className='content'>
                                    <div className='label'>
                                        订单总量
                                </div>
                                    <div className='count'>
                                        {orderCount}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home