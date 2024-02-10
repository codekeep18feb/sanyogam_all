import React, { useEffect, useState } from "react";
import AcceptIcon from "@mui/icons-material/DoneAllOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
export default function RequestScreen({ with_email }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true; // Variable to track whether the component is mounted

    const fetchData = async () => {
      const JWT_TOKEN = localStorage.getItem("token");
      const token = `Bearer ${JWT_TOKEN}`;

      try {
        const response = await fetch(
          `http://192.168.1.9:8000/api/request_info/${with_email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (isMounted) {
          if (response.status === 200) {
            const responseData = await response.json();
            setData(responseData);
          } else {
            console.log("Error occurred while fetching data.");
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData(); // Call the fetchData function

    // Cleanup function to cancel the asynchronous task when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [with_email]);

  if (loading) {
    return <p>Loadin...</p>;
  }

  return (
    <div>
      {data ? (
        // <div>Request Status - {data["status"]}</div>
        <div style={{ marginTop: "20px" }}>
          <div>user online | offline</div>

          <div
            style={{
              display: "flex",
              border: "1px solid grey",
              padding: "10px 5px",
            }}
          >
            <div
              style={{ width: "50%", display: "flex", alignItems: "center" }}
            >
              <AcceptIcon style={{ fontSize: "35px", color: "#1F4294" }} />
              <div>Accept</div>
            </div>
            <div
              style={{ width: "50%", display: "flex", alignItems: "center" }}
            >
              <CancelIcon style={{ fontSize: "35px", color: "#666666" }} />
              <div>Decline</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loaing...</div>
      )}
    </div>
  );
}
