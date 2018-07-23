import React from 'react';

import './style.scss';

class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
      document.title = this.props.title + ' - APP';
    }

    render() {
        const { title } = this.props;
        return (
           <div className = 'title'>{title}
           <div> { this.props.children} </div>
           </div>
        );
    }
}

export default Title;