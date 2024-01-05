import React from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserChatTileInListC from "./UserChatTileInListC";
import MatchesFilterScrollBarOnChatC from "./MatchesFilterScrollBarOnChatC";

function TabPanel({profiles, SetWithUserId, SetWithEmail, with_userid}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      
      <Tabs value={value} onChange={handleChange} >
        <Tab label="Recent" sx={{ width: '50%'}}/>
        <Tab label="Active" sx={{ width: '50%'}}/>
      </Tabs>
      
      <div>
        <MatchesFilterScrollBarOnChatC />
        
      </div>
      {value === 0 && <UserChatTileInListC profiles={profiles} SetWithUserId={SetWithUserId} SetWithEmail={SetWithEmail} with_userid={with_userid}/>}
      {value === 1 && <UserChatTileInListC profiles={profiles} SetWithUserId={SetWithUserId} SetWithEmail={SetWithEmail} with_userid={with_userid}/>}
    </div>
  );
}


export default TabPanel