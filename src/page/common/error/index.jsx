import React from 'react';
import './style.scss';
class ErrorPage extends React.Component {
    render() {
        return (<div className='error'>
            <div className='img-box'>
                img
        </div>
            <div className='text-box'>
                <div className='error-text'>
                    404
            </div>
                <div className='label'>
                    出错啦
            </div>
            </div>
        </div>
        )
    }
}
export default ErrorPage;