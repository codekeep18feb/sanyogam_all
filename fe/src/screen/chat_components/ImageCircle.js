import React, { useRef } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@material-ui/core';

const circleStyle = {
  width: '80px',
  height: '80px',
  backgroundColor: 'red',
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

export function ImageCircle({ user,dimention }) {
  return (
<div>
<div style={{padding:"10px 10px 0 10px"}}>
      <div style={{position:"relative"}}>
      {user.online && <div style={user.online ? {...greenDotStyle,backgroundColor:"#00E676"}:{...greenDotStyle,backgroundColor:"black"}} />}
      <img src={user.imageUrl} alt="Circle Image" width={dimention || 90} height={dimention || 90} style={{borderRadius:"50%"}}/>
    </div>
    {/* {user && user.name &&  <Typography variant="subtitle2">{user.name}</Typography>} */}
    </div>
    <div style={{paddingLeft:"10px"}}>
      {user && user.name &&  <Typography noWrap variant="subtitle2">{user.name}</Typography>}

    </div>

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
