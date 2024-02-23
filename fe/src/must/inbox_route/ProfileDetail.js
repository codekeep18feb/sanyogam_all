import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react';
import { Button, Snackbar } from '@material-ui/core';

export default function ProfileDetail() {
  // Access the id parameter using useParams hook
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [profileDetail, setprofileDetail] = useState(null);
  const [notificationR, setnotificationR] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const submitRequest = async (status, to_email) => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    const response = await fetch(`http://192.168.1.11:8000/api/handle_request?to_email=${to_email}&action=${status}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      setnotificationR({ data, error: null });
      setSnackbarMessage('Request sent successfully');
      setSnackbarOpen(true);
    } else {
      setnotificationR({ data: null, error: "error - status_code - " + response.status });
      setSnackbarMessage('Error occurred while sending request');
      setSnackbarOpen(true);
    }
  }

  useEffect(async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    const response = await fetch(`http://192.168.1.11:8000/api/profile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      setprofileDetail(data);
    } else {
      console.warn('People issue');
    }
  }, [id]); // Include id in dependencies

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const goToPreviousProfile = () => {
    // Calculate previous profile id
    const previousId = parseInt(id, 10) - 1;
    navigate(`/profile_detail/${previousId}`);
  };

  const goToNextProfile = () => {
    // Calculate next profile id
    const nextId = parseInt(id, 10) + 1;
    navigate(`/profile_detail/${nextId}`);
  };

  if (profileDetail) {
    return (
      <div>
        <h2>Profile Detail</h2>
        <p>Profile ID: {profileDetail.id}</p>
        <p>Email: {profileDetail.user_email}</p>
        <Button variant='contained' color='secondary' onClick={() => {
          submitRequest('SENT', profileDetail.user_email);
        }}>Send Connect</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
        <div>
          {/* Previous Profile Button */}
          {parseInt(id, 10) > 1 && (
            <Button variant="contained" color="primary" onClick={goToPreviousProfile}>
              Previous Profile
            </Button>
          )}
          {/* Next Profile Button */}
          <Button variant="contained" color="primary" onClick={goToNextProfile}>
            Next Profile
          </Button>
        </div>
      </div>
    );
  } else {
    return (<div>loading profileDetail..</div>);
  }
}
