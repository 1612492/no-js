import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

const title = 'React with Webpack and Babel';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<div className="bg">{title}</div>);
