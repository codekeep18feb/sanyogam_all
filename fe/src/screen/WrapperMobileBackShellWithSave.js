import React, { useEffect, useState } from "react";
import HeaderDesktop from "./HeaderDesktop";
import Footer from "./Footer";
import HeaderMobile from "./HeaderMobile";
import BottomMobile from "./BottomMobile";
import bgImg from "../images/sky_bg.jpg";
import HeaderMobileBack from "./HeaderMobileBack";
import { Button } from "@mui/material";
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width >= 468) {
    return "desktop";
  } else {
    return "mobile";
  }
};

export default function WrapperMobileBackShellWithSave({
  children,
  title,
  onSave,
}) {
  console.log("title", title);

  const [deviceType, setDeviceType] = useState(getDeviceType());

  console.log("deviceType", deviceType);
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    // Add event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "rgba(173, 216, 230, 0.3)",
          textAlign: "center",
        }}
      >
        {/* {deviceType==='mobile'?<HeaderMobile />:<HeaderDesktop />} */}
        <HeaderMobileBack title={title} />
      </div>

      {/* Middle Content (Scrollable) */}
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          border: "1px solid blue",
          // ,backgroundImage: `url(${bgImg})`,
          // backgroundSize: 'cover', // or 'contain' based on your preference
          // backgroundRepeat: 'no-repeat',
          // backgroundPosition: 'center center'
        }}
      >
        {/* <img src={bgImg} width={"10px"} height={"10px"}/> */}
        {children}
      </div>

      {/* Bottom Header */}
      <Button
        variant="contained"
        style={{
          borderRadius: 0,
          backgroundColor: "rgba(255,0,153,1)",
          color: "white",
        }}
        onClick={() => onSave()}
      >
        Save1
      </Button>
    </div>
  );
}
