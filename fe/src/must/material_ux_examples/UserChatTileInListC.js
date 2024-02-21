import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ImageCircle } from './ImageCircle';
import { Icon } from "@mui/material";
import callIcon from "@mui/icons-material/Phone";

export default function UserChatTileInListC({ profiles, SetWithEmail, SetWithUserId, with_userid }) {
  //here will make the call for user online status
  console.log("profileswhatisit?", profiles)
  return (
    <div>
      {profiles && profiles.map((profile) => (
        <div key={profile.id}
          onClick={() => {
            SetWithUserId(profile.id)
            SetWithEmail(profile.user_email)
          }}
        >
          <Grid container alignItems='center' justifyContent='center'>
            <Grid item xs={2}>
              <ImageCircle dimention={50} user={{ id: 1, online: true, imageUrl: "https://images.pexels.com/photos/3206118/pexels-photo-3206118.jpeg?auto=compress&cs=tinysrgb&w=160&h=150&dpr=1" }} />

            </Grid>
            <Grid item xs={7}>
              <div style={{textAlign:"center"}}>
                <div style={{ display: "flex", alignItems: "end", justifyContent: "center" }}>
                  <div >{profile.user_fname} {profile.user_lname}</div>
                  <Icon component={callIcon} style={{ color: "blue", backgroundColor: "white", borderRadius: "50%" }} />
                  <div>



                  </div>


                </div>
                <Typography variant="subtitle2">Has Messsged You!</Typography>
              </div>



            </Grid>
            <Grid item xs={3}>
              <div>10:20 AM</div>
              <div>
                <div style={{border:"1px solid red" }} >2</div>
              </div>

            </Grid>
          </Grid>


        </div>
      ))}
    </div>
  )
}