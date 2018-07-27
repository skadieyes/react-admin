import Request from 'util/request.jsx';
const _request = new Request();

class Product {
    // 获取商品列表
    getProductList(pageNum) {
        return _request.post({
            url: '/manage/product/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
}

export default Product;