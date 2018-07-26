import React from 'react';
import Title from 'component/structure/title/index.jsx'
import { Card, Row, Col, Table } from 'antd';
import Common from 'util/common.jsx';
import User from 'service/user-service.jsx';
import './style.scss';
const { Column } = Table;

const _common = new Common();
const _user = new User();
const data = [{
    key: '1',
    name: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];
const tabelHead = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '用户名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: '电话',
        dataIndex: 'tel',
        key: 'tel'
    },
    {
        title: '注册时间',
        dataIndex: 'register',
        key: 'register'
    }
]


class UserList extends React.Component {
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
        _user.getUserList(this.state.pageNum).then(res => {
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
        let tableData = list && list.length > 0 ? list.map((user) => {
            return (
                {
                    key: user.id,
                    id: user.id || '',
                    name: user.username || '',
                    email: user.email || '',
                    tel: user.phone || '',
                    register: new Date(user.createTime).toLocaleString()
                }
            );
        }) : [{
                key: '1',
                id: '',
                name: '',
                email: '没有符合的结果',
                tel:  '',
                register: ''
            }];
        return (<div className='user'>
            <Title title={'用户'} >
            </Title>
            <div>
                <Row className='row' gutter={32}>
                    <Col span={24} >
                        <div className='card-box'>
                            <div className='title'>
                                <i className='fa fa-user-o' />
                            </div>
                            <Card bordered={false} className='card'>
                                <Table loading={loadding} dataSource={tableData} pagination={{ size: 'big', pageSize: pageSize, total: total, onChange: this.onPageNumChange.bind(this), showQuickJumper: true }} size={'middle'} className='user-table'>
                                    {
                                        tabelHead && tabelHead.length > 0 && list.length> 0 && tabelHead.map((item) => {
                                            return <Column
                                                title={item.title || ''}
                                                dataIndex={item.dataIndex || ''}
                                                key={item.key || ''}
                                            />
                                        })
                                    }
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
export default UserList;