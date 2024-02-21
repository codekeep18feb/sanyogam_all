import React from 'react';
import PropTypes from 'prop-types';
import './Tile.css'; // Import a CSS file for styling

const Tile = ({ children }) => {
  return <div className="tile">{children}</div>;
};

Tile.propTypes = {
  children: PropTypes.node.isRequired, // Ensure that children are provided
};

export default Tile;