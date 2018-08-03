import React from 'react';
import Title from 'component/structure/title/index.jsx'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Card, Row, Col } from 'antd';
import Common from 'util/common.jsx';
import Product from 'service/product-service.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import './save.scss';

const _common = new Common();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            secondCategoryList: [],
            subImages: [],
            form: {
                name: '',
                firstCategoryId: '',
                secondCategoryId: '',
                subtitle: '',
                price: '',
                stock: '',
            }
        }
    }
    componentDidMount() {
        this.loadFirstCategory();
    }
    //加载一级分类
    loadFirstCategory() {
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            })
        }, errMsg => {
            _common.errorTips(errMsg);
        });
    }
    //加载二级分类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            })
        }, errMsg => {
            _common.errorTips(errMsg);
        });
    }
    handleChange(name, e) {
        switch (name) {
            case 'firstCategoryId':
                this.setState(Object.assign(this.state.form, {
                    [name]: e.target.value,
                }), () => {
                    // 更新二级品类
                    this.loadSecondCategory();
                });
                break;
            default: this.setState(Object.assign(this.state.form, { [name]: e.target.value }));
        }

    }
    // 上传图片成功
    onUploadSuccess(url) {
        let images = this.state.subImages;
        images.push(url);
        this.setState({ 'subImages': images });
    }

    // 上传图片失败
    onUploadError(error) {
        _common.errorTips(error.message || '上传图片失败');
    }
    render() {
        const { form, firstCategoryList, secondCategoryList, subImages } = this.state;
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
                            <div className='form'>
                                <div className='fc'>
                                    <FormControl className='control'>
                                        <InputLabel>商品名称</InputLabel>
                                        <Input id="name" value={form.name} onChange={this.handleChange.bind(this, 'name')} />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl className='control' >
                                        <InputLabel>商品描述</InputLabel>
                                        <Input id="subtitle" value={form.subtitle} onChange={this.handleChange.bind(this, 'subtitle')} />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl className='control-half' style={{ paddingRight: 15 }} >
                                        <InputLabel>一级分类</InputLabel>
                                        <Select
                                            value={form.firstCategoryId}
                                            className='font'
                                            style={{ textAlign: 'left' }}
                                            onChange={this.handleChange.bind(this, 'firstCategoryId')}
                                        >
                                            {
                                                firstCategoryList.length > 0 && firstCategoryList.map((category, index) => {
                                                    if (index < 30) {
                                                        return <MenuItem value={category.id} key={index} className='font'>{category.name}</MenuItem>
                                                    }
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl className='control-half' style={{ paddingLeft: 15 }}  >
                                        <InputLabel style={{ paddingLeft: 15 }}>二级分类</InputLabel>
                                        <Select
                                            value={form.secondCategoryId}
                                            className='font'
                                            style={{ textAlign: 'left' }}
                                            onChange={this.handleChange.bind(this, 'secondCategoryId')}
                                        >
                                            {
                                                secondCategoryList.length > 0 && secondCategoryList.map((category, index) => {
                                                    if (index < 30) {
                                                        return <MenuItem value={category.id} key={index} className='font'>{category.name}</MenuItem>
                                                    }
                                                })
                                            }
                                        </Select>

                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl className='control' >
                                        <InputLabel>商品价格</InputLabel>
                                        <Input id="price" value={form.price}
                                            onChange={this.handleChange.bind(this, 'price')}
                                            endAdornment={<InputAdornment position="end">元</InputAdornment>}
                                        />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl className='control' >
                                        <InputLabel>商品库存</InputLabel>
                                        <Input id="stock" value={form.stock}
                                            onChange={this.handleChange.bind(this, 'stock')}
                                            endAdornment={<InputAdornment position="end">件</InputAdornment>}
                                        />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl className='control' >
                                        <FileUploader onSuccess={this.onUploadSuccess.bind(this)}
                                            onError={this.onUploadError.bind(this)} />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl className='control' >
                                        {
                                            subImages.length ? subImages.map((image, index) => {
                                                return <img key={index} src={image.url} />
                                            }) : '请上传图片'
                                        }
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <Button variant="contained" color="primary" className='btn' style={{ width: 100 }}>
                                        保存
                                     </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>


    }
}
export default ProductSave;