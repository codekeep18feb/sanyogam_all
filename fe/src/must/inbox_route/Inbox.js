import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import InboxFilterTopRow from "./InboxFilterTopRow";

export default function Inbox() {
  const [suffix, setsuffix] = useState("SENT");

  const [all_profiles, setall_profiles] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(async () => {
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    const response = await fetch(
      `http://192.168.1.2:8000/api/filter_profiles_v1?req_status=${suffix}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      setall_profiles(data);
    } else {
      console.warn("People issue");
    }
  }, [suffix]);

  let all_profs = null;
  if (all_profiles) {
    all_profs = all_profiles.map((profile) => (
      <div
        style={{ border: "1px solid red", marginTop: "30px" }}
        key={profile.id} // Make sure to provide a unique key for each mapped element
        onClick={() => navigate(`/profile_detail/${profile.id}`)} // Navigate on click using useNavigate
      >
        {JSON.stringify(profile)}
      </div>
    ));
  }

  return (
    <div>
      <InboxFilterTopRow setSuffix={setsuffix} />
      {all_profs}
    </div>
  );
}
