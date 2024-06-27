import React, { useState } from "react";
import { Navbar, Nav, Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../../cssFile/nav.css";
import Links from "../../components/link";
import TH from "../../img/logo2.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../calls/auth/service";
import { UseUserInfos } from "../../context/userInfo";


const MyNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { userInfo, userValue, userTime } = UseUserInfos();

  const handleModalToggle = () => setShowModal(!showModal);

  return (
    <>
      <Navbar
        // bg="primary"
        variant="dark"
        expand="lg"
        className="nav-h fs-9 headerFamily navHead"
        fixed="top"
        style={{ zIndex: 1000 }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ color: "black" }}
            className="mdQuTutrHb mdQuTutrHb3"
          >
            <img
              src={TH}
              alt="Tutoring Hub Logo"
              height="130"
              width="130"
              className="d-inline-block align-top rounded-pill hubHomeName mdQuhubHomeName"
            />
            TUTORING HUB
          </Navbar.Brand>

       
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="navbar-nav f-right displayEnd mb-4 mt-3 justify-content-end"
          >
            <Nav className="displayEnd">
              {userInfo.role && (
                <>
                  <Nav>
                    <div className="dropdown justify-content-end mdQudrpdwn mdQudrpdwn3">
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="custom-color d-inline-block drpdownHed"
                          style={{
                            width: "150px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "13px",
                            color: "black",
                          }}
                        >
                          <div className="d-inline-block">
                            <p
                              className="avatar rounded-circle text-white d-inline-flex justify-content-center align-items-center text-black crclrH"
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "10px",
                                color: "blue",
                              }}
                            >
                              T
                            </p>
                          </div>
                          {userInfo && userInfo.user}
                          <i className="arrow down w-75" aria-hidden="true"></i>
                        </Dropdown.Toggle>
                        {/* <span class="badge bg-secondary">4</span> */}

                        <Dropdown.Menu
                          className="mdQuhedDrp3"
                          style={{
                            minWidth: "400px",
                            minHeight: "70px",
                            marginLeft: "-225px",
                            width: "auto !important",
                          }}
                        >
                          <div className="w-100">
                            <Dropdown.Item>
                              <div className="d-flex flex-direction-row">
                                <p
                                  className="avatar rounded-circle text-white d-inline-flex justify-content-center align-items-center text-black crclrH2 "
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "20px",
                                    color: "blue",
                                  }}
                                >
                                  T
                                </p>
                                <h4
                                  className=" mt-2"
                                  style={{ fontFamily: "Georgia, serif" }}
                                >
                                  {userInfo &&  userInfo.role}

                                </h4>
                              </div>

                              <i
                                className="arrow down w-75"
                                aria-hidden="true"
                              ></i>
                            </Dropdown.Item>

                            {userInfo.role === "student" &&
                              userValue === "true" && (
                                <>
                                  <Dropdown.Item
                                    className="p-3 fs-5 text-secondary font-weight-bold drpdwnOpt"
                                    onClick={() => {
                                      navigate("/teachers/profileedits");
                                    }}
                                  >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit Profile
                                  </Dropdown.Item>

                                  
                                </>
                              )}

                            {userInfo.role === "teacher" &&
                              userTime === "true" && (
                                <>
                                  <Dropdown.Item
                                    className="p-3 fs-5 text-secondary font-weight-bold drpdwnOpt"
                                    onClick={() => {
                                      navigate("/teachers/profileedits");
                                    }}
                                  >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit Profile
                                  </Dropdown.Item>
                                 
                                </>
                              )}

                              
                            {userInfo.role === "admin" &&
                                <>
                                  <Dropdown.Item
                                    className="p-3 fs-5 text-secondary font-weight-bold drpdwnOpt"
                                    onClick={() => {
                                      navigate("/admin");
                                    }}
                                  >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Main Portal
                                  </Dropdown.Item>
                                 
                                </>
                              }

                            <Dropdown.Item
                              className="p-3 fs-5 text-secondary font-weight-bold drpdwnOpt"
                              onClick={logout}
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout
                            </Dropdown.Item>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Nav>
                </>
              )}

              {!userInfo.role && (
                <>
                  <Links
                    text="Register"
                    onClick={() => {
                      setUrl("/authPage/signup");
                      setValue("Register");
                      handleModalToggle();
                    }}
                    // className="border fs-5 border-white signHeader drpdownHed1"
                    className="btn btn-outline-primary fs-5 signHeader"
                  />
                  <Links
                    text="Login"
                    onClick={() => {
                      setUrl("/authPage/login");
                      handleModalToggle();
                      setValue("Login");
                    }}
                    // className=" border fs-5 border-white loginHeader drpdownHed1"
                    className="btn btn-outline-primary fs-5 signHeader logHed"
                    style={{ textTransform: "none" }}
                  />

                  <Modal
                    show={showModal}
                    onHide={handleModalToggle}
                    className="modal modalHeader"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>{value}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="text-center">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {/* <Links
                          variant="secondary"
                          to={`${url}/teacher`}
                          onClick={handleModalToggle}
                          text=" I am a Teacher"
                          className="text-white rounded-pill p-3 mb-5 mt-4 w-75 md-button fs-4 vh-50 adMrBtnHedr"
                        /> */}

                        <Link
                          variant="secondary"
                          className="text-white rounded-pill p-3 mb-5 mt-4 w-75 md-button fs-4 vh-50 adMrBtnHedr"
                          to={`${url}/teacher`}
                          onClick={handleModalToggle}
                        >
                          <span>I am a Teacher</span>
                        </Link>

                        <Link
                          variant="outline-secondary"
                          to={`${url}/student`}
                          onClick={handleModalToggle}
                          className="text-white rounded-pill p-3 mb-4 w-75 md-button fs-4 vh-50 adMrBtnHedr"
                        >
                          <span>I am a Student</span>
                        </Link>
                      </div>
                    </Modal.Body>
                  </Modal>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
