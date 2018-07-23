import React from 'react';
import { Card } from 'antd';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import 'antd/lib/card/style/index.less';

import './style.scss';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 330
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
    }
    handleChange(name, event) {
        this.setState({
            [name]: event.target.value,
        });
    };
    onSubmit(e){
    console.log(e);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className='login-bg'>
                <div className='card-box'>
                    <div className='title'>
                        <i className='fa fa-user-o' />
                    </div>
                    <Card bordered={false} className='card'>
                        <form className={classes.container} noValidate autoComplete="off">
                            <FormControl className={classNames(classes.margin)}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange.bind(this, 'name')}
                                    margin="normal"
                                />
                            </FormControl>
                            <FormControl className={classNames(classes.margin)}>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type='password'
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange.bind(this, 'password')}
                                    margin="normal"
                                />
                            </FormControl>
                            <FormControl className={classNames(classes.margin) + 'button-box'}>
                                <Button variant="contained" 
                                        color="secondary" 
                                        className={classes.button}
                                        onClick = {this.onSubmit.bind(this)}
                                        >
                                    登录
                                    </Button>
                            </FormControl>             
                             </form>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);