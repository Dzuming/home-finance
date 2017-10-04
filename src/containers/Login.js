import React, {Component} from 'react';
import InputText from '../components/InputText';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
const styles = () => ({
  container: {
    height: '100vh'
  }
});
class Login extends Component {
  state = {}
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
        </form>
        </Grid>
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  openSideNav: PropTypes.func
};
export default withStyles(styles)(Login);
