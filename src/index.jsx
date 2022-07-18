import './global.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Layout from './layout';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
