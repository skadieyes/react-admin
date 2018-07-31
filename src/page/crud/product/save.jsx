import React from 'react';
import Title from 'component/structure/title/index.jsx'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Card, Row, Col } from 'antd';
import './save.scss';
class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                categoryId: '',
                subtitle: '',
                prici: '',
                stock: ''
            }
        }
    }
    handleChange() {

    }
    render() {
        const { form } = this.state;
        return <div className='product-save'>
            <Title title={'添加商品'} >
            </Title>
            <Row className='row' gutter={32}>
                <Col span={24} >
                    <div className='card-box'>
                        <div className='title'>
                            <i className='fa fa-shopping-basket' />
                        </div>
                        <Card bordered={false} className='card'>
                            <form className='form'>
                                <div className='fc'>
                                    <FormControl >
                                        <InputLabel>商品名称</InputLabel>
                                        <Input id="name" value={form.name} onChange={this.handleChange.bind(this, 'name')} />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl >
                                        <InputLabel>商品描述</InputLabel>
                                        <Input id="subtitle" value={form.subtitle} onChange={this.handleChange.bind(this, 'subtitle')} />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl >
                                        <InputLabel>所属分类</InputLabel>
                                        <Select
                                            value={form.categoryId}
                                            className='font'
                                            style={{ width: 220, paddingLeft: 15 }}
                                            onChange={this.handleChange.bind(this, 'categoryId')}
                                        >
                                            <MenuItem value={0} className='font'>根据id查询</MenuItem>
                                            <MenuItem value={1} className='font'>根据name查询</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl >
                                        <InputLabel>商品价格</InputLabel>
                                        <Input id="price" value={form.price}
                                            onChange={this.handleChange.bind(this, 'price')}
                                            endAdornment={<InputAdornment position="end">元</InputAdornment>}
                                        />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl >
                                        <InputLabel>商品库存</InputLabel>
                                        <Input id="stock" value={form.stock}
                                            onChange={this.handleChange.bind(this, 'stock')}
                                            endAdornment={<InputAdornment position="end">件</InputAdornment>}
                                        />
                                    </FormControl>
                                </div>
                            </form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>


    }
}
export default ProductSave;