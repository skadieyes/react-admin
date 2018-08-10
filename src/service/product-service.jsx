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
    // 搜索商品列表
    searchProductList(params) {
        return _request.post({
            url: '/manage/product/search.do',
            data: params
        })
    }
    // 改变商品状态
    setProductStatus(productStatus) {
        return _request.post({
            url: '/manage/product/set_sale_status.do',
            data: productStatus
        })
    }
    // 获取商品详情
    getProduct(productId) {
        return _request.post({
            url: '/manage/product/detail.do',
            data: {
                productId: productId || 0
            }
        });
    }
    // 保存商品
    saveProduct(product) {
        return _request.post({
            url: '/manage/product/save.do',
            data: product
        })
    }

    /*
    * 品类相关
    * */
    getCategoryList(parentCategoryId) {
        return _request.post({
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }
}

export default Product;