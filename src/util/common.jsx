import { message } from 'antd';
import React  from 'react';
class Common extends React.Component {
    // 获取url参数
    getUrlParam(name) {
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 错误提示
    errorTips(errMsg) {
        message.error(errMsg || '好像哪里出错了');
    }
    // 成功提示
    successTips(successMsg) {
        message.success(successMsg || '操作成功');
    }
    // 本地存储
    setStorage(name, data) {
        let dataType = typeof data;
        // json对象
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else {
            console.log('该类型不能用于本地存储');
        }
    }
    // 取出本地存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        }
        else {
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}

export default Common;