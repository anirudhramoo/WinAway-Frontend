import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { Link } from "react-router-dom";

import { Avatar } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { logout } from "../../redux/user";
import Search from "./Search";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const smaller = useMediaQuery("(max-width:1000px)");
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return !smaller ? (
    <div className="header">
      <Link to="/" className="link">
        <h2 class="app-name gradient">WinAway</h2>
      </Link>
      <>
        <div className="links-div">
          <Link to="/giveaways" className="link">
            <h4 className="gradient link-ex">Find</h4>
          </Link>
          <div style={{ marginLeft: "50px" }}>
            <Link to="/create" className="link">
              <h4 className="gradient link-ex">Create</h4>
            </Link>
          </div>
        </div>
        <Search />
        {user && (
          <div className="user">
            <Avatar src={user?.user?.imageUrl} />
            <p
              className="logout"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </p>
          </div>
        )}
      </>
    </div>
  ) : (
    <>
      <div className="alt-header">
        <div className="navbar">
          <MenuIcon
            onClick={showSidebar}
            className="menu-bars"
            fontSize="large"
          />
        </div>
        <div className="search_div">
          <Search />
        </div>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle" onClick={showSidebar}>
            <CloseIcon className="menu-bars" fontSize="large" />
          </li>

          <li className="nav-text">
            <Link to="/">
              <span className="title-span">WinAway</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/giveaways">
              <SearchIcon fontSize="medium" />
              <span className="heading__span left">Find</span>
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/create">
              <CreateIcon />
              <span className="heading__span left">Create</span>
            </Link>
          </li>

          {user && (
            <li className="nav-text">
              <div
                className="header-user"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <Avatar
                  src={user?.user?.imageUrl}
                  style={{ display: "inline-block" }}
                />
                <span className="logout">Logout</span>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
