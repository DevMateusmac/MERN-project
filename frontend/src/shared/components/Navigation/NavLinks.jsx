import "./NavLinks.css";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";

export default function NavLinks() {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" end>
          ALL USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`} end>
            MY PLACES
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new" end>
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth" end>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
}
