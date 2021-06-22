import React from 'react';
import { observer } from 'mobx-react';

const Layout = observer(({ children, stores }) => {
  return(
    <div>
      {children}
      <button
        onClick={() => stores?.ui?.toggleMenu()}
      >{stores?.ui?.openMenu ? 'Cerrar' : 'Abrir'}</button>
    </div>
  );
}) 

export default Layout;