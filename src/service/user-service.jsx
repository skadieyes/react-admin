import Request from 'util/request.jsx';
const _request = new Request();

class User {
    // 用户登录
    login(loginInfo) {
        return _request.post({
            url: '/manage/user/login.do',
            data: loginInfo
        });
    }
    logout() {
        return _request.post({
            url: '/user/logout.do'
        });
    }
    checkLoginInfo(loginInfo) {
        const { username, password } = loginInfo;
        // 判断用户名为空
        if (typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        // 判断密码为空
        if (typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }
    getUserList(pageNum) {
        return _request.post({
            url: '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
}

export default User;