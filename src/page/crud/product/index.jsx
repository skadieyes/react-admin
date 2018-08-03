import React from 'react';
import Title from 'component/structure/title/index.jsx'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Table, Icon, Tooltip, Switch, Modal } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import Common from 'util/common.jsx';
import Product from 'service/product-service.jsx';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './style.scss';

const _common = new Common();
const _product = new Product();
const confirm = Modal.confirm;
const tabelHead = [
    {
        title: '商品id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '商品信息',
        dataIndex: 'info',
        key: 'info',
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
        title: <span className='operation'>操作</span>,
        dataIndex: 'operation',
        key: 'operation'
    }
]
const theme = createMuiTheme({
    palette: {
        secondary: {
            light: '#33bfff',
            main: '#00b0ff',
            contrastText: '#007bb2',
        },
    }
});

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageSize: 0,
            total: 0,
            pageNum: 1,
            loadding: false,
            visible: false,
            type: 0,
            id: '',
            name: ''
        }
    }
    componentDidMount() {
        this.loadProductList();
    }
    showConfirm(confirmTips, id, newStatus) {
        let _this = this;
        confirm({
            title: `确认要${confirmTips}该商品？`,
            content: '点击确认按钮后, 商品将被' + confirmTips,
            onOk() {
                _product.setProductStatus({
                    productId: id,
                    status: newStatus
                }).then(res => {
                    _common.successTips(res);
                    _this.loadProductList();
                }, errMsg => {
                    _common.errorTips(errMsg);
                })
            },
            onCancel() {

            }
        });
    }
    loadProductList() {
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
    searchProductList(name, value) {
        this.setState({ loadding: true });
        let params = {
            pageNum: this.state.pageNum,
            [name]: value
        };
        _product.searchProductList(params).then(res => {
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
            this.loadProductList();
        });
    }
    onSetStatus(id, currentStatus) {
        let newStatus = currentStatus === 1 ? 2 : 1;
        let confirmTips = currentStatus === 1 ?
            '下架' : '上架';
        this.showConfirm(confirmTips, id, newStatus);

    }
    handleChange(name, e) {
        switch (name) {
            case 'type': this.setState({ [name]: e.target.value });
                break;
            default: this.setState({ [name]: e.target.value });
                break;
        }
    }

    onSearchKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSearch();
        }
    }

    onSearch() {
        const { type, id, name } = this.state;
        const keyWord = type === 0 ? id : name;
        const keyName = type === 0 ? 'productId' : 'productName';
        this.setState({
            pageNum: 1
        }, () => {
            this.searchProductList(keyName, keyWord);
        })
    }
    render() {
        const { list, pageSize, total, loadding, type } = this.state;
        let tableData = list && list.length > 0 ? list.map((item) => {
            return (
                {
                    key: item.id,
                    id: item.id,
                    info: item.name || '',
                    price: item.price + '元' || '',
                    status:
                        <span>
                            <Switch checkedChildren="在售" unCheckedChildren="下架" defaultChecked checked={item.status === 1}
                                onChange={this.onSetStatus.bind(this, item.id, item.status)}
                            />
                        </span>,
                    operation: <span >
                        <Link to={`/product/detail/${item.id}`}>
                            <IconButton color="primary">
                                <Tooltip title="详情" placement="top">
                                    <Icon type="edit" />
                                </Tooltip>
                            </IconButton>
                        </Link>
                        <Link to={`/product/save/'${item.id}`}>
                            <IconButton color="secondary">
                                <Tooltip title="编辑" placement="top">
                                    <Icon type="ellipsis" />
                                </Tooltip>
                            </IconButton>
                        </Link>
                    </span>
                }
            );
        }) : [{
            key: '1',
            id: '',
            info: '没有符合的结果',
            price: '',
            status: '',
            operation: ''
        }];
        return (<div className='product'>
            <Title title={'商品'} >
            </Title>
            <Row className='row' gutter={32}>
                <Col span={24} >
                    <div className='card-box'>
                        <div className='title'>
                            <i className='fa fa-calendar' />
                        </div>
                        <Card bordered={false} className='card'>
                            <div className='search'>
                                <div className='fc-select fc'>
                                    <Select
                                        value={this.state.type}
                                        className='font '
                                        style={{ width: 220, paddingLeft: 15 }}
                                        onChange={this.handleChange.bind(this, 'type')}
                                    >
                                        <MenuItem value={0} className='font'>根据id查询</MenuItem>
                                        <MenuItem value={1} className='font'>根据name查询</MenuItem>
                                    </Select>
                                </div>
                                {
                                    type === 0 ?
                                        <div className='fc font'>
                                            <TextField
                                                id="id"
                                                label="Id"
                                                className='font'
                                                value={this.state.id}
                                                onChange={this.handleChange.bind(this, 'id')}
                                                margin="normal"
                                            />
                                        </div>
                                        :
                                        <div className='fc font'>
                                            <TextField
                                                id="name"
                                                label="Name"
                                                className='font'
                                                value={this.state.name}
                                                onChange={this.handleChange.bind(this, 'name')}
                                                onKeyUp={this.onSearchKeyUp.bind(this)}
                                                margin="normal"
                                            />
                                        </div>
                                }
                                <div className='fc'>
                                    <Button variant="fab" color="secondary" className={'btn'}
                                        onClick={this.onSearch.bind(this)}>
                                        <Icon type='search'></Icon>
                                    </Button>
                                </div>
                                <div className='fc'>
                                    <MuiThemeProvider theme={theme}>
                                        <Link to={`/crud/product/save`}>
                                            <Button variant="fab" color="secondary" className={'btn'}>
                                                <Icon type='plus'></Icon>
                                            </Button>
                                        </Link>
                                    </MuiThemeProvider>
                                </div>
                            </div>
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
        )
    }
}
export default ProductList;