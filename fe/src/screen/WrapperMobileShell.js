import React, { useEffect, useState } from 'react'
import HeaderDesktop from './HeaderDesktop'
import Footer from './Footer'
import HeaderMobile from './HeaderMobile';
import BottomMobile from './BottomMobile';

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width >= 468) {
    return 'desktop';
  
  } else {
    return 'mobile';
  }
};


export default function WrapperMobileShell({children}) {


  const [deviceType, setDeviceType] = useState(getDeviceType());

  console.log('deviceType',deviceType)
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    // Add event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ backgroundColor: 'rgba(173, 216, 230, 0.3)', textAlign: 'center' }}>

      {deviceType=='mobile'?<HeaderMobile />:<HeaderDesktop />}
      </div>

      {/* Middle Content (Scrollable) */}
      <div style={{ flex: '1', overflowY: 'auto', border: '1px solid blue' }}>
      {children}

      </div>

      {/* Bottom Header */}
      <div style={{ textAlign: 'center' }}>
      {/* <Footer/> */}
      {deviceType=='mobile'?<BottomMobile />:<Footer />}

      </div>
    </div>
  )
}
