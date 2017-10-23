import React, {Component} from 'react';
import compose from 'recompose/compose';
import InputText from '../components/InputText';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../actions/loginActions';
import {withStyles} from 'material-ui/styles';
import RaisedButton from '../components/RaisedButton';

const styles = () => ({
  container: {
    height: '100vh'
  }
});
class Login extends Component {
  state = {
    login: '',
    password: ''
  }
  sendCredentials = () => {
    this
      .props
      .actions
      .login({Email: this.state.login, Password: this.state.password})
      .then(() => {
        if (this.props.isAuthenticated) {
          this
            .props
            .history
            .push('/Spending');
        }
      });
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };
  componentDidMount() {}
  render() {
    const classes = this.props.classes;
    const {login, password} = this.state;
    return (
      <div>
        <Grid
          container
          className={classes.container}
          align='center'
          direction='row'
          justify='center'>
          <form noValidate autoComplete="off">
            <div>
              <InputText
                label="Login"
                value={login}
                changeMethod={this.handleChange('login')}/>
            </div>
            <div>
              <InputText
                label="Password"
                value={password}
                changeMethod={this.handleChange('password')}/>
            </div>
            <RaisedButton
              clickMethod={this.sendCredentials}
              text={"Login"}
              color={"contrast"}/>
          </form>
        </Grid>
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object
};
function mapStateToProps(state) {
  return {isAuthenticated: state.login.isAuthenticated};
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Login);
