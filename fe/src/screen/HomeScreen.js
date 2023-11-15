import React, { useState } from 'react';
import { connect } from 'react-redux';
import Tile from "./Tile"
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MatchesProfileBox from './MatchesProfileBox';
import RecomUsers from './RecomUsers';
import RecentVisited from './RecentVisited';
import MeDetailScreen from './MeDetailScreen';

function HomeScreen({ authData }) {
  const [editMode, SeteditMode] = useState(false);
  console.log("", authData);

  return (
    <Grid
      container
      // direction="row-reverse"
      justifyContent="center"
      alignItems="center"
    >
      {/* First column (70%) */}
      
      <Grid item md={6}>
        {/* Content for the first column */}
        <div style={{ backgroundColor: "#f0f0f0", padding: "16px" }}>
          {authData ? (
            <Tile>
              <MeDetailScreen
                authData={authData}
                editMode={editMode}
                SeteditMode={SeteditMode}
              />
            </Tile>
          ) : (
            <p>Please log in to see your data.</p>
          )}

          {/* <Tile>
            <Typography variant="h1">Interests sent (2)</Typography>
            <Typography variant="mediumParagraph">
              You have got (2) intrests contact them right away
            </Typography>
          </Tile>

          <Tile>
            <Typography variant="h1">Interests sent (2)</Typography>
            <Typography variant="mediumParagraph">
              You have got (2) intrests contact them right away
            </Typography>
          </Tile> */}

          {/* <Tile>
            <Typography variant="h1">Interests sent (2)</Typography>
            <Typography variant="mediumParagraph">
              You have got (2) intrests contact them right away
            </Typography>
          </Tile> */}
        </div>
      </Grid>
      {/* Second column (30%) */}
      <Grid item xs={4}>
        {/* Content for the second column */}
        {/* <div style={{ backgroundColor: "#ccc", padding: "16px" }}>
          Go Premium
        </div> */}
      </Grid>
      <div>
        <RecomUsers />
      </div>
      <div>
        <RecentVisited />
      </div>
    </Grid>
  );

}

const mapStateToProps = (state) => {
  console.log("authdatawhat", state.auth.data);
  return {
    authData: state.auth.data,
  };
};

// Use React.memo to memoize the HomeScreen component
export default connect(mapStateToProps, null)(React.memo(HomeScreen));
