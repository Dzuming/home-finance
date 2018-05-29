import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography } from 'material-ui';

const CardList = ({ name, gridSize }) => {
  return (
    <Grid item xs={gridSize}>
      <Card>
        <CardContent>
          <Typography color="inherit" type="body2" align="center">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

CardList.propTypes = {
  name: PropTypes.string.isRequired,
  gridSize: PropTypes.string.isRequired,
};

export default CardList;
