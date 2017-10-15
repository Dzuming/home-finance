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
  state = {}
  getData() {
    this
    .props
    .actions
    .login({Email: 'test', Password: 'test'});
  }
  componentDidMount() {
    this.getData();
  }
  render() {  
    const classes = this.props.classes;
    return (
      <div>
        <Grid
            container
            className={classes.container}
            align='center'
            direction='row'
            justify='center'
          >
        <form noValidate autoComplete="off">
          <div>
            <InputText label="Login"/>
          </div>
          <div>
            <InputText label="Password"/>
          </div>
          <RaisedButton text={"Login"} color={"contrast"}/>
        </form>
        </Grid>
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object,
};
function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
export default  compose(withStyles(styles),connect(mapStateToProps, mapDispatchToProps))(Login);
