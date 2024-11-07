/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Cube from './Cube';

const useStyles = createUseStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    width: '200px',
    margin: '0 auto',
  },
  cubeContainer: {
    width: '50px',
    height: '50px',
    backgroundColor: '#e0e0e0', // Default color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#bdbdbd', // Hover color
    },
  },
});

const ColorGrid = () => {
  const classes = useStyles();
  const [colors, setColors] = useState(Array(16).fill(false));

  const toggleColor = (index: number) => {
    setColors(prevColors => prevColors.map((color, i) => (i === index ? !color : color)));
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    // Check if the key pressed is Enter or Space to trigger the click handler
    if (event.key === 'Enter' || event.key === ' ') {
      toggleColor(index);
    }
  };

  return (
    <div className={classes.grid}>
      {colors.map((isToggled, index) => (
        <div
          key={index}
          className={classes.cubeContainer}
          style={{
            backgroundColor: isToggled ? '#757575' : '#e0e0e0', // Toggled color
          }}
          role="button" // Treat as button for a11y
          tabIndex={0} // Make it focusable
          onClick={() => toggleColor(index)} // Mouse click handler
          onKeyDown={event => handleKeyPress(event, index)} // Keyboard press handler
        >
          <Cube title={`Cube ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ColorGrid;
