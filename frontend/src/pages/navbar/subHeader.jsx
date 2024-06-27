import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UseUserInfos } from "../../context/userInfo";
import "../../cssFile/studentNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const { userInfo } = UseUserInfos();
  let userType = userInfo.role;
  const userExists = localStorage.getItem("user");

  if (!userExists) {
    return null;
  }

  const commonLinks = (
    <NavLink
      to="/chats/chat"
      className="nav-link mx-2 subHed mdQuAnmDrp mdQuFntSz3"
      activeClassName="active-link"
    >
      Chat
    </NavLink>
  );

  const studentLinks = (
    <>
      <NavLink
        to="/"
        className="nav-link mx-2 subHed1 mdQudshBrd mdQuAnmDrp mdQuFntSz3"
        activeClassName="active-link"
      >
        Home
      </NavLink>
      {commonLinks}
      <NavLink
        to="/student/dashboard"
        className="nav-link mx-2 subHed mdQudshBrd mdQuAnmDrp mdQuFntSz3"
        activeClassName="active-link"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/student/searchScreen"
        className="nav-link mx-2 subHed mdQuAnmDrp mdQuFntSz3"
        activeClassName="active-link"
      >
        Find a Tutor
      </NavLink>
    </>
  );

  const teacherLinks = (
    <>
      <NavLink
        to="/teachers/teacherDashboard"
        className="nav-link mx-2 subHed1 mdQudshBrd mdQuAnmDrp mdQuFntSz3"
        activeClassName="active-link no-underline"
      >
        Dashboard
      </NavLink>
      {commonLinks}
      <NavLink
        to="/teachers/teacherCompleteProfile"
        className="nav-link mx-2 subHed mdQuAnmDrp mdQuFntSz3"
        activeClassName="active-link"
      >
        Profile
      </NavLink>
      {/* <NavLink
        to="/teachers/requests"
        className="nav-link mx-2"
        activeClassName="active-link"
      >
        Find a Student
      </NavLink> */}

      <NavLink
        to="/teachers/time"
        className="nav-link mx-2 subHed mdQuAnmDrp mdQuFntSz3"
        activeClassName="active-link"
      >
        Schdedule Time
      </NavLink>
    </>
  );

  return (
    <div style={{ position: "relative" }}>
      <Navbar
        expand="lg"
        className="bg-body-tertiary "
        style={{ position: "relative", marginTop: "80px" }}
      >
        <Container className="he mdQuHEhe">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="mdQuCusNvTgl"
          >
            <FontAwesomeIcon icon={faBars} className="mdQuTglIcn" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex align-content-center p-3 fs-3 dFlx mdQudFlx">
              {userType === "student" ? studentLinks : teacherLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
