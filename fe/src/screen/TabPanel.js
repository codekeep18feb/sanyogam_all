import React from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PeopleScreen from "./PeopleScreen";

function TabPanel({profiles, SetWithUserId, SetWithEmail, with_userid}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Recent" />
        <Tab label="Active" />
      </Tabs>
      

      {value === 0 && <PeopleScreen profiles={profiles} SetWithUserId={SetWithUserId} SetWithEmail={SetWithEmail} with_userid={with_userid}/>}
      {value === 1 && <PeopleScreen profiles={profiles} SetWithUserId={SetWithUserId} SetWithEmail={SetWithEmail} with_userid={with_userid}/>}
    </div>
  );
}


export default TabPanel