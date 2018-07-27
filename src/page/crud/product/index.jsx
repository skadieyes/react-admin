import React from 'react';
import Title from 'component/structure/title/index.jsx'
import { Card, Row, Col, Table } from 'antd';
import Common from 'util/common.jsx';
import Product from 'service/product-service.jsx';
import './style.scss';
const { Column } = Table;

const _common = new Common();
const _product = new Product();
const tabelHead = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 500
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation'
    }
]


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageSize: 0,
            total: 0,
            pageNum: 1,
            loadding: false
        }
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() {
        this.setState({ loadding: true });
        _product.getProductList(this.state.pageNum).then(res => {
            this.setState(res, () => {
                this.setState({ loadding: false })
            })
        }, errMsg => {
            this.setState({
                list: []
            }, () => {
                this.setState({ loadding: false })
            });
            _common.errorTips(errMsg);
        })
    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    }
    render() {
        const { list, pageSize, total, loadding } = this.state;
        let tableData = list && list.length > 0 ? list.map((item) => {
            return (
                {
                    key: item.id,
                    name: item.name || '',
                    price: item.price + '元' || '',
                    status: item.status || '',
                    operation: ''
                }
            );
        }) : [{
            key: '1',
            name: '没有符合的结果',
            price: '',
            status: '',
            operation: ''
        }];
        return (<div className='product'>
            <Title title={'商品'} >
            </Title>
            <div>
                <Row className='row' gutter={32}>
                    <Col span={24} >
                        <div className='card-box'>
                            <div className='title'>
                                <i className='fa fa-user-o' />
                            </div>
                            <Card bordered={false} className='card'>
                                <Table loading={loadding}
                                    dataSource={tableData}
                                    pagination={{
                                        size: 'big',
                                        pageSize: pageSize,
                                        total: total, onChange: this.onPageNumChange.bind(this),
                                        showQuickJumper: true
                                    }}
                                    size={'middle'}
                                    columns={tabelHead}
                                    className='table'>

                                </Table>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        )
    }
}
export default ProductList;