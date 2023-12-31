import React, { useState, useEffect } from "react";
import HomeProfileBox from "./HomeProfileBox";

import InboxProfileBox from "./InboxProfileBox";

import InboxFilterScrollBarC from "./InboxFilterScrollBarC";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const [data, setdata] = useState(null);
  const nagivate = useNavigate();

  const fetchRequests = async () => {
    // console.log('onsave ran here we can see the ',{family_info:formValues})
    // const data = await submitProfileUpdateData({family_info:formValues})
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    const response = await fetch(`http://192.168.1.5:8000/api/handle_request`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      // nagivate(-1);

      console.log("successfully fetched all requests", data);

      return data;
      // //   const arrayOfObjects = [
      // //     { "key1": "value1a", "key2": "value2a" },
      // //     { "key1": "value1b", "key2": "value2b" },
      // //     // Add more objects as needed
      // // ];

      // // Specify the keys to merge
      // const key1ToMerge = "user_fname";
      // const key2ToMerge = "user_lname";

      // // Use map to create a new array with merged keys
      // const newArray = data.map(obj => ({
      //     ...obj,
      //     fullname: `${obj[key1ToMerge]} ${obj[key2ToMerge]}`,
      //     // Optionally, you can exclude the original keys if needed
      //     [key1ToMerge]: undefined,
      //     [key2ToMerge]: undefined,
      // }));

      // // Display the modified array of objects
      // console.log(newArray);
      // setdata(newArray)
    } else {
      console.log("Error updating profile");
    }
  };

  useEffect(async () => {
    const api_data = await fetchRequests();
    console.log("api_datdsafa", api_data);
    setdata(api_data);
  }, []);

  let data_map;
  if (data) {
    data_map = data.map((i) => {
      console.log("herewhatcanweextract", i);
      return (
        // <HomeProfileBox
        // imageUrl='https://images.pexels.com/photos/12056650/pexels-photo-12056650.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2'
        // fullname={i.fullname}
        // current_location={i.family_info.family_location}
        // />

        <InboxProfileBox
          imageUrl="https://images.pexels.com/photos/12056650/pexels-photo-12056650.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2"
          fullname={"hardcodedname"}
          current_location={"hardecoded"}
          email={i.frm_user}
        />
      );
    });
  }

  return (
    <div>
      <div style={{ margin: "10px" }}>
        <InboxFilterScrollBarC />
      </div>
      {data && (
        <div style={{ display: "flex", flexDirection: "row" }}>{data_map}</div>
      )}
    </div>
  );
}

function handleSearch() {
  // Handle search logic here
}
