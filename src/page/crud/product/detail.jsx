import React from 'react';
import Title from 'component/structure/title/index.jsx'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Card, Row, Col } from 'antd';
import Common from 'util/common.jsx';
import Product from 'service/product-service.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss';
import './detail.scss';
const _common = new Common();
const _product = new Product();

class ProductDetail extends React.Component {
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
                secondCategoryId: 0,
                subtitle: '',
                price: '',
                stock: '',
                detail: '',
                status: 1 // 在售
            }
        }
    }
    componentDidMount() {
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


    render() {
        const { form, subImages } = this.state;
        return <div className='product-save product-detail'>
            <Title title={'商品信息'} >
            </Title>
            <Row className='row' gutter={32}>
                <Col span={24} >
                    <div className='card-box'>
                        <div className='title'>
                            <i className='fa fa-shopping-basket' />
                        </div>
                        <Card bordered={false} className='card'>
                            <div className='form'>
                                <div className='fc fc-title yellow'>
                                    {`商品信息`}
                                </div>
                                <Row className='row' gutter={32}>
                                    <Col span={8} >
                                        <div className='fc'>
                                            {`商品名称: ${form.name}`}
                                        </div>
                                    </Col>
                                    <Col span={8} >
                                        <div className='fc'>
                                            {`商品描述: ${form.subtitle}`}
                                        </div>
                                    </Col>
                                    <Col span={8} >
                                        <div className='fc'>
                                            {`商品价格: ${form.price}`}
                                        </div>
                                    </Col>
                                    <Col span={8} >
                                        <div className='fc'>
                                            {`商品库存: ${form.stock}`}
                                        </div>
                                    </Col>
                                </Row>
                                <div className='fc fc-title red'>
                                    {`商品图片`}
                                </div>
                                <div className='fc fc-img'>
                                    <FormControl className='control control-img' >
                                        <div className='img-box'>
                                            {
                                                subImages && subImages.length > 0 ? subImages.map((image, index) => {
                                                    return <div className='img-item' key={index} >
                                                        <img className='img' key={index} src={image.url} />
                                                    </div>
                                                }) : '还没有上传图片'
                                            }
                                        </div>
                                    </FormControl>
                                </div>
                                <div className='fc fc-title blue'>
                                    {`商品描述`}
                                </div>
                                <div className='fc' dangerouslySetInnerHTML={{__html: form.detail}} />
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>


    }
}
export default ProductDetail;