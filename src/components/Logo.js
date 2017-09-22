import React from 'react';
import { withStyles } from 'material-ui/styles';
const styles = theme => ({
  h2: {
    padding: '122px',
  },
  primary: {
    color: theme.palette.primary[500],
  },
});
const Logo = (classes) => {
  return (
    <div>
      <a>
      <h2>Home Finance</h2>
      </a>
      <small>v 0.1.0</small>
    </div>
  );
};

export default withStyles(styles)(Logo);
