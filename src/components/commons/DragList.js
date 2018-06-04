import React from 'react';
import PropTypes from 'prop-types';

const DragList = ({ element, isDragging }) => (
  <div
    style={{
      opacity: isDragging ? 0.5 : 1,
      border: '1px solid black',
      margin: '5px 0 0 10px',
      padding: '0 5px',
    }}
  >
    {element.name}
  </div>
);

DragList.propTypes = {};

export default DragList;
