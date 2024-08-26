/* eslint-disable react/prop-types */
import "./SideDrawer.css";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

export default function SideDrawer({ show, children, onClick }) {
  return createPortal(
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>{children}</aside>
    </CSSTransition>,
    document.getElementById("drawer-hook")
  );
}
