import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%'
    }
});

function NavBar(props) {
    const classes = props.classes;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography type="title" color="inherit">
                        Home finance
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);