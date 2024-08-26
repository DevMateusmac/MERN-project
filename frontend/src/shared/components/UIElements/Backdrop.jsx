/* eslint-disable no-unused-vars */
import {createPortal}from 'react-dom';

import './Backdrop.css';

export default function Backdrop ({onClick}) {
  return createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById('backdrop-hook')
  );
}

