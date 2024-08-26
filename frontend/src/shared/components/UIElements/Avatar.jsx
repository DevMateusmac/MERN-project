/* eslint-disable react/prop-types */
import "./Avatar.css";

export default function Avatar({ className, style, image, alt, width }) {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
}
