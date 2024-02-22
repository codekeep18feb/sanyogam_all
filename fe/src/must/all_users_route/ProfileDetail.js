import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button, Snackbar } from '@material-ui/core';

export default function ProfileDetail() {
  // Access the id parameter using useParams hook
  let { id } = useParams();
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
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
      </div>
    );
  } else {
    return (<div>loading profileDetail..</div>);
  }
}
