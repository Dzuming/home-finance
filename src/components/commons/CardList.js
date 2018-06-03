import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles/index';

const CardList = ({ name, gridSize, classes, children }) => {
  return (
    <Grid item xs={gridSize}>
      <Card
        classes={{
          root: classes.card,
        }}
      >
        <CardContent>
          <Typography color="inherit" type="body2" align="center">
            {children ? children : name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
``;

CardList.propTypes = {
  name: PropTypes.string.isRequired,
  gridSize: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {
  card: {
    height: '100%',
  },
};

export default withStyles(styles)(CardList);
