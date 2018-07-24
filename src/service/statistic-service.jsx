import Request from 'util/request.jsx';
const _request  = new Request();

class Statistic{
    // 首页数据统计
    getHomeCount(){
        return _request.get({
            url: '/manage/statistic/base_count.do'
        });
    }
}

export default Statistic;