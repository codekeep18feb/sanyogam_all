import React from 'react';

const imageStyle = {
  backgroundImage: `url('https://dhankosh.s3.ap-south-1.amazonaws.com/assets/Frame+967.svg')`,
  backgroundSize: '200px 200px', // Set the image size to 200x200
  backgroundPosition: 'center', // Center the image horizontally
  display: 'flex',
  alignItems: 'center', // Center the image vertically
  height: '600px',
  backgroundRepeat: 'no-repeat', // Turn off background image repeat
  border:"1px solid grey",
  width: '700px',
};

export default function BlankChatScreen() {
  return (
    <div style={imageStyle}>
      {/* Your content goes here */}
    </div>
  );
}
