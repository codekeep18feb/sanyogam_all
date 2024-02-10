import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/counter/AuthAction';
import { useNavigate, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatIcon from '@mui/icons-material/QuestionAnswer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function BottomMobile({ auth_data, logout }) {
  const navigate = useNavigate();

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-around', // Equal spacing between items
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const handleLogout = async () => {
    // ... (unchanged)
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(270.06deg, rgba(46, 27, 254, 0.74) 5.67%, #FF0099 75.76%)' }}>
      <div style={headerStyle}>
        {auth_data && (
          <>
            <Button color="inherit" style={{ flex: 1 }}>
              <Link to="/" style={linkStyle}>
                <HomeIcon />
                <div>Home</div>
              </Link>
            </Button>
            <Button color="inherit" style={{ flex: 1 }}>
              <Link to="/all_users" style={linkStyle}>
                <PeopleIcon />
                <div>Matches</div>
              </Link>
            </Button>
            <Button color="inherit" style={{ flex: 1 }}>
              <Link to="/inbox" style={linkStyle}>
                <MailOutlineIcon />
                <div>Inbox</div>
              </Link>
            </Button>
            <Button color="inherit" style={{ flex: 1 }}>
              <Link to="/chat_ows" style={linkStyle}>
                <ChatIcon />
                <div>Chat</div>
              </Link>
            </Button>
            <Button color="inherit" style={{ flex: 1 }}>
              <Link to="/pricing" style={linkStyle}>
                <AttachMoneyIcon />
                <div>Premium</div>
              </Link>
            </Button>
          </>
        )}
      </div>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data
  };
};

export default connect(mapStateToProps, { logout })(BottomMobile);
