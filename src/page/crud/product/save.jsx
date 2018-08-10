import React from 'react';
import Title from 'component/structure/title/index.jsx'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Card, Row, Col, Icon } from 'antd';
import Common from 'util/common.jsx';
import Product from 'service/product-service.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss';

const _common = new Common();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
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
                detail: '',
                status: 1 // 在售
            }
        }
    }
    componentDidMount() {
        this.loadFirstCategory();
        this.loadProduct();
    }
    // 加载商品
    loadProduct() {
        // 有id的时候，编辑功能
        if (this.state.id) {
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                res.defaultDetail = res.detail;
                Object.keys(res).forEach(key => {
                    switch (key) {
                        case 'parentCategoryId':
                            if (res[key] === 0) {
                                this.setState(Object.assign(this.state.form, { 'firstCategoryId': res['categoryId'] }));
                            } else {
                                this.setState(Object.assign(this.state.form, { 'firstCategoryId': res[key] }));
                                this.loadSecondCategory(res[key]);
                            }
                            break;
                        case 'categoryId':
                            if (res[key] !== 0) {
                                this.setState(Object.assign(this.state.form, { 'secondCategoryId': res[key] }));
                            }
                            break;
                        case 'subImages': this.setState({
                            'subImages': res[key]
                        });
                            break;
                        default: this.setState(Object.assign(this.state.form, { [key]: res[key] }));
                    }
                })
            }, (errMsg) => {
                _common.errorTips(errMsg);
            })
        }
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
    loadSecondCategory(firstCategoryId) {
        _product.getCategoryList(firstCategoryId).then(res => {
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
                    this.loadSecondCategory(this.state.firstCategoryId);
                });
                break;
            case 'detail':
                this.setState(Object.assign(this.state.form, { [name]: e }));
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
    // 删除图片
    deleteImg(index) {
        let { subImages } = this.state;
        subImages.splice(index, 1);
        this.setState({
            subImages: subImages
        })
    }
    // 检查保存商品的表单数据
    checkProduct(product) {
        let result = {
            status: true,
            msg: '验证通过'
        };
        // 判断用户名为空
        if (typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: '请填写商品名称'
            }
        }
        // 判断描述不能为空
        if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 验证品类ID
        if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if (typeof product.price !== 'number' || !(product.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }

        return result;
    }
    // 提交保存
    onSubmit() {
        let { subImages, form } = this.state;
        let images = [];
        subImages.length && subImages.map((image) => {
            images.push(image.uri);
        })
        let params = {
            name: form.name,
            id: this.state.id,
            subtitle: form.subtitle,
            categoryId: parseInt(this.state.secondCategoryId),
            subImages: images.join(),
            detail: form.detail,
            price: parseFloat(form.price),
            stock: parseInt(form.stock),
            status: form.status
        }
        let productCheckResult = this.checkProduct(params);
        // 表单验证成功
        if (productCheckResult.status) {
            _product.saveProduct(params).then((res) => {
                _common.successTips(res);
            }, (errMsg) => {
                _common.errorTips(errMsg);
            });
        }
        // 表单验证失败
        else {
            _common.errorTips(productCheckResult.msg);
        }
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
                                    <FormControl className='control' >
                                        <InputLabel>一级分类</InputLabel>
                                        <Select
                                            value={form.firstCategoryId}
                                            className='font'
                                            style={{ textAlign: 'left' }}
                                            onChange={this.handleChange.bind(this, 'firstCategoryId')}
                                        >
                                            {
                                                firstCategoryList.length > 0 && firstCategoryList.map((category, index) => {
                                                    return <MenuItem value={category.id} key={index} className='font'>{category.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                {form.secondCategoryId !== form.firstCategoryId && <div className='fc'>
                                    <FormControl className='control'  >
                                        <InputLabel >二级分类</InputLabel>
                                        <Select
                                            value={form.secondCategoryId}
                                            className='font'
                                            style={{ textAlign: 'left' }}
                                            onChange={this.handleChange.bind(this, 'secondCategoryId')}
                                        >
                                            {
                                                secondCategoryList.length > 0 && secondCategoryList.map((category, index) => {
                                                    return <MenuItem value={category.id} key={index} className='font'>{category.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                }
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
                                    <FormControl className='control control-file' >
                                        <FileUploader onSuccess={this.onUploadSuccess.bind(this)}
                                            onError={this.onUploadError.bind(this)} />
                                    </FormControl>
                                </div>
                                <div className='fc fc-img'>
                                    <FormControl className='control control-img' >
                                        <div className='img-box'>
                                            {
                                                subImages && subImages.length > 0 ? subImages.map((image, index) => {
                                                    return <div className='img-item' key={index} onClick={this.deleteImg.bind(this, index)}>
                                                        <img className='img' key={index} src={image.url} />
                                                        <Icon type="close-circle-o" className='img-close' />
                                                    </div>
                                                }) : '还没有上传图片'
                                            }
                                        </div>
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl className='control control-rich' >
                                        <InputLabel>商品详情</InputLabel>
                                        <RichEditor
                                            defaultDetail={this.state.detail}
                                            onValueChange={this.handleChange.bind(this, 'detail')} />
                                    </FormControl>
                                </div>
                                <div className='fc'>
                                    <FormControl className='control control-btn' >
                                        <Button variant="contained" color="primary" className='btn' style={{ width: 100 }}
                                            onClick={this.onSubmit.bind(this)}
                                        >
                                            保存
                                     </Button>
                                    </FormControl>
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