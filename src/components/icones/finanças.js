import React from 'react';
import { Icon } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

function Logo() {
  return (
    <Icon>
      <MonetizationOnIcon style={{ color: '	#32CD32' }} />
      {/* <img src="/images/finanças.svg" height={22} width={25} alt="brasil" /> */}
    </Icon>
  );
}

export default Logo;
