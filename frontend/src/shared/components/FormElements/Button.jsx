/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import "./Button.css";

export default function Button({
  href,
  to,
  size,
  inverse,
  danger,
  exact,
  type,
  disabled,
  onClick,
  children,
  className
}) {
  if (href) {
    return (
      <a
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`button button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"} ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || "default"} ${
        inverse && "button--inverse"
      } ${danger && "button--danger"} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
