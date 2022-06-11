import React from 'react'
import ReactDOM from 'react-dom'
import './style.css';

function App () {
  return <>
    <h1>Welcome</h1>
    <p>To React esbuild starter</p>
    <p>"npm run start" for dev server</p>
    <p>"npm run build" for production build</p>
    </>
}

ReactDOM.render(<App/>,document.getElementById('root'));
