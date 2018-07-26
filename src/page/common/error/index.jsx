import React from 'react';
import Title from 'component/structure/title/index.jsx'
class ErrorPage extends React.Component {
    render() {
        return (<div>
            <Title title={'Error'} >
            </Title>
            <div>
                出错啦
            </div>
        </div>
        )
    }
}
export default ErrorPage;