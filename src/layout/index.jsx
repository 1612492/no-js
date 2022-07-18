import './style.css';
import React from 'react';

import Code from './code';
import Menu from './menu';
import Preview from './preview';

function Layout() {
  return (
    <main className="main">
      <Menu />
      <Preview />
      <Code />
    </main>
  );
}

export default Layout;
