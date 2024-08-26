/* eslint-disable react/prop-types */

import './Card.css';

export default function Card({className, style, children}){
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}

