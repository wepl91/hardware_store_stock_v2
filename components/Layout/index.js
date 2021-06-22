import React from 'react';
import { observer } from 'mobx-react';

const Layout = observer(({ children, stores }) => {
  return(
    <div style={{padding: '40px'}}>
      {children}
    </div>
  );
}) 

export default Layout;