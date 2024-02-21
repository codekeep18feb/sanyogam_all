import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const Pricing = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const containerStyle = {
    height: '100vh', // Set the container to full viewport height
    display: 'flex', // Use flexbox to split the container into two halves
    flexDirection: 'column', // Stack the two halves vertically
  };

  const topHalfStyle = {
    backgroundImage:
      'url(https://images.pexels.com/photos/1111316/pexels-photo-1111316.jpeg?auto=compress&cs=tinysrgb&w=800)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flex: '1', // Make the top half take up 50% of the container's height
  };

  const bottomHalfStyle = {
    backgroundColor: 'white',
    flex: '1', // Make the bottom half take up 50% of the container's height
    position: 'relative', // Position the tile relative to this div
  };

  const tileStyle = {
    width: '200px',
    height: '300px',
    backgroundColor: 'blue', // Set the tile's background color (you can change this)
    position: 'absolute',
    left: '50%', // Position the tile horizontally in the middle
    top: '20%', // Position the tile vertically in the middle
    transform: 'translate(-50%, -50%)', // Center the tile both horizontally and vertically
  };

  const overlayStyle = {
    width: '300px',
    height: '200px',
    backgroundColor: "white",//'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
    position: 'fixed', // Position the overlay fixed to the viewport
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the overlay horizontally and vertically
    zIndex: showOverlay ? '1' : '-1', // Show the overlay when showOverlay is true
    display: showOverlay ? 'block' : 'none',
  };

  const proceedButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const handleContinueClick = () => {
    setShowOverlay(true);
  };

  // const handleProceedClick = () => {
  //   setShowOverlay(false);


  // };

  return (
    <div style={containerStyle}>
      <div style={topHalfStyle}></div>
      <div style={bottomHalfStyle}>
        <div style={tileStyle}>
          <div>Rs 499</div>
          <button onClick={handleContinueClick}>Continue</button>
        </div>
      </div>
      {showOverlay && (
        <div style={overlayStyle}>
          <PaymentForm />
        </div>
      )}
    </div>
  );
};

export default Pricing;
