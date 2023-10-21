import React, { useRef } from 'react';
import Grid from '@mui/material/Grid';

const circleStyle = {
  width: '80px',
  height: '80px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '5px',
  position: 'relative',
};

const greenDotStyle = {
  width: '16px',
  height: '16px',
  backgroundColor: 'green',
  borderRadius: '50%',
  position: 'absolute',
  bottom: 0,
  right: 0,
};

export function ImageCircle({ user }) {
  return (
    <div style={circleStyle}>
      {user.online && <div style={greenDotStyle} />}
      <img src={user.imageUrl} alt="Circle Image" width="60" height="60" />
    </div>
  );
}

export default function ImageCircles({ users }) {
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    const startX = e.pageX;
    let scrollLeft = containerRef.current.scrollLeft;

    const handleMouseMove = (e) => {
      const x = e.pageX - startX;
      containerRef.current.scrollLeft = scrollLeft - x;
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        width: '100%', // Add width and height to the parent container
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        id="child" // Apply styles to the child element
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'scroll', // Use overflowY for vertical scrolling
          paddingRight: '17px',
          boxSizing: 'content-box',
          overflowX: 'hidden', // Hide horizontal scrollbar
        }}
        ref={containerRef}
        onMouseDown={handleMouseDown}
      >
        <div style={{ whiteSpace: 'nowrap', display: 'flex', scrollSnapType: 'x mandatory' }}>
          <div style={{ flex: '0 0 auto' }}>
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid item key={user.id}>
                  <ImageCircle user={user} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
