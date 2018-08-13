import React from 'react';
import Title from 'component/structure/title/index.jsx'
import { Link } from 'react-router-dom';
import Statistic from 'service/statistic-service.jsx'
import Common from 'util/common.jsx';
import { Card, Row, Col } from 'antd';
import G2 from '@antv/g2';
import './style.scss';

const _statistic = new Statistic();
const _common = new Common();

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
            _common.errorTips(errMsg);
        });
    }
    componentDidMount() {
        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
            { genre: 'OOO', sold: 272 },
            { genre: 'Strategy', sold: 15 },
            { genre: 'Action', sold: 12 },
            { genre: 'Shooter', sold: 50 },
            { genre: 'Other', sold: 15 },
            { genre: 'News', sold: 85 },
            { genre: 'Games', sold: 25 }
        ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
        // Step 1: 创建 Chart 对象
        const chart = new G2.Chart({
            container: 'chart', // 指定图表容器 ID
            width: 900, // 指定图表宽度
            height: 300 // 指定图表高度
        });
        // Step 2: 载入数据源
        chart.source(data);
        // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
        chart.interval().position('genre*sold').color('genre')
        // Step 4: 渲染图表
        chart.render();
    }
    render() {
        const { userCount, productCount, orderCount } = this.state;
        return (
            <div className='home' id='home'>
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
                <Row className='row' gutter={32}>
                    <Col span={24} >
                        <div className='card-box'>
                            <div className='title green'>
                                <i className='fa fa-line-chart' />
                            </div>
                            <Card bordered={false} className='card'>
                                <div className='content'>
                                    <div className='label'>
                                        趋势图
                                </div>
                                    <div className='count'>
                                        <div id="chart"></div>
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