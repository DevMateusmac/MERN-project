import "./MainNavigation.css";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { useState } from "react";
import Backdrop from "../UIElements/Backdrop";

export default function MainNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  function handleOpenDrawer() {
    setDrawerIsOpen((prevDrawer) => !prevDrawer);
  }

  function handleCloseDrawer() {
    setDrawerIsOpen((prevDrawer) => !prevDrawer);
  }

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={handleCloseDrawer} />}

      <SideDrawer show={drawerIsOpen} onClick={handleCloseDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={handleOpenDrawer}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}
