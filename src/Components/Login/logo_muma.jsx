import React from 'react';
import logo from '../../assets/img/icons/logo.png';

const MumaLogo = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15%',}}>
      <img src={logo} style={{ width: '35%', height: '35%' }} />
    </div>
  );
};

export default MumaLogo;