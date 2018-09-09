import React from 'react';
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

const styles = {
  card: {
    height: '100%',
  },
};

export default withStyles(styles)(CardList);
